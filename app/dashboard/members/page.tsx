'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Download,
  Eye,
  Edit,
  Mail,
  Phone,
  Star,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Plus,
  CreditCard
} from 'lucide-react';

// Mock data - will be replaced with real data from Supabase
const mockMembers = [
  {
    id: 1,
    name: 'Sarah Mueller',
    email: 'sarah.m@example.com',
    phone: '+49 176 12345678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    membershipType: 'VIP',
    contractLength: '12 Monate',
    status: 'active',
    lastVisit: '2024-10-30',
    visits: 142,
    credits: 45,
    totalSpent: 2850,
    nextPayment: '15.11.2024',
    favoriteClass: 'Yoga Flow',
    preferredTime: 'Morgens 9-11 Uhr',
    monthlySpending: 95.50,
    averageVisitSpending: 20.07,
    preferredProducts: ['Protein Shakes', 'Yoga Equipment'],
    purchaseHistory: [
      { date: '30.10.2024', item: 'Protein Shake', category: 'Getränke', price: 4.50 },
      { date: '28.10.2024', item: 'Energy Bar', category: 'Snacks', price: 2.90 },
      { date: '25.10.2024', item: 'Yoga Mat', category: 'Equipment', price: 45.00 },
      { date: '22.10.2024', item: 'Protein Shake', category: 'Getränke', price: 4.50 },
      { date: '20.10.2024', item: 'Supplements', category: 'Ernährung', price: 38.60 }
    ]
  },
  {
    id: 2,
    name: 'Michael Schmidt',
    email: 'michael.s@example.com',
    phone: '+49 176 87654321',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    membershipType: 'Premium',
    contractLength: '6 Monate',
    status: 'active',
    lastVisit: '2024-10-29',
    visits: 89,
    credits: 32,
    totalSpent: 1920,
    nextPayment: '12.11.2024',
    favoriteClass: 'HIIT Training',
    preferredTime: 'Abends 18-20 Uhr',
    monthlySpending: 64.00,
    averageVisitSpending: 21.57,
    preferredProducts: ['Supplements', 'Energy Drinks'],
    purchaseHistory: [
      { date: '29.10.2024', item: 'Energy Drink', category: 'Getränke', price: 3.50 },
      { date: '27.10.2024', item: 'Protein Bar', category: 'Snacks', price: 3.20 },
      { date: '24.10.2024', item: 'Supplements', category: 'Ernährung', price: 42.00 },
      { date: '21.10.2024', item: 'Energy Drink', category: 'Getränke', price: 3.50 }
    ]
  },
  {
    id: 3,
    name: 'Anna Weber',
    email: 'anna.w@example.com',
    phone: '+49 176 11223344',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    membershipType: 'Premium',
    contractLength: '12 Monate',
    status: 'paused',
    lastVisit: '2024-10-15',
    visits: 67,
    credits: 18,
    totalSpent: 1580,
    nextPayment: '20.11.2024',
    favoriteClass: 'Pilates',
    preferredTime: 'Mittags 12-14 Uhr',
    monthlySpending: 52.67,
    averageVisitSpending: 23.58,
    preferredProducts: ['Smoothies', 'Protein Shakes'],
    purchaseHistory: [
      { date: '15.10.2024', item: 'Smoothie', category: 'Getränke', price: 5.50 },
      { date: '12.10.2024', item: 'Protein Shake', category: 'Getränke', price: 4.50 },
      { date: '08.10.2024', item: 'Yoga Mat', category: 'Equipment', price: 45.00 }
    ]
  },
  {
    id: 4,
    name: 'Thomas Bauer',
    email: 'thomas.b@example.com',
    phone: '+49 176 55667788',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
    membershipType: 'Basic',
    contractLength: '3 Monate',
    status: 'active',
    lastVisit: '2024-10-28',
    visits: 34,
    credits: 12,
    totalSpent: 890,
    nextPayment: '18.11.2024',
    favoriteClass: 'Krafttraining',
    preferredTime: 'Abends 19-21 Uhr',
    monthlySpending: 29.67,
    averageVisitSpending: 26.18,
    preferredProducts: ['Protein Bars', 'Energy Drinks'],
    purchaseHistory: [
      { date: '28.10.2024', item: 'Protein Bar', category: 'Snacks', price: 3.20 },
      { date: '25.10.2024', item: 'Energy Drink', category: 'Getränke', price: 3.50 }
    ]
  },
  {
    id: 5,
    name: 'Julia Richter',
    email: 'julia.r@example.com',
    phone: '+49 176 99887766',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
    membershipType: 'VIP',
    contractLength: '24 Monate',
    status: 'active',
    lastVisit: '2024-10-30',
    visits: 201,
    credits: 50,
    totalSpent: 4250,
    nextPayment: '10.11.2024',
    favoriteClass: 'Spinning',
    preferredTime: 'Morgens 6-8 Uhr',
    monthlySpending: 141.67,
    averageVisitSpending: 21.14,
    preferredProducts: ['Supplements', 'Protein Shakes', 'Energy Bars'],
    purchaseHistory: [
      { date: '30.10.2024', item: 'Protein Shake', category: 'Getränke', price: 4.50 },
      { date: '29.10.2024', item: 'Supplements', category: 'Ernährung', price: 42.00 },
      { date: '28.10.2024', item: 'Energy Bar', category: 'Snacks', price: 2.90 },
      { date: '27.10.2024', item: 'Protein Shake', category: 'Getränke', price: 4.50 },
      { date: '25.10.2024', item: 'Sports Drink', category: 'Getränke', price: 3.20 }
    ]
  },
  {
    id: 6,
    name: 'Max Klein',
    email: 'max.k@example.com',
    phone: '+49 176 33445566',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    membershipType: 'Premium',
    contractLength: '12 Monate',
    status: 'expired',
    lastVisit: '2024-09-20',
    visits: 45,
    credits: 0,
    totalSpent: 1120,
    nextPayment: '-',
    favoriteClass: 'Boxing',
    preferredTime: 'Abends 20-22 Uhr',
    monthlySpending: 0,
    averageVisitSpending: 24.89,
    preferredProducts: ['Energy Drinks'],
    purchaseHistory: [
      { date: '20.09.2024', item: 'Energy Drink', category: 'Getränke', price: 3.50 },
      { date: '15.09.2024', item: 'Protein Bar', category: 'Snacks', price: 3.20 }
    ]
  }
];

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [membershipFilter, setMembershipFilter] = useState('Alle Mitgliedschaften');
  const [statusFilter, setStatusFilter] = useState('Alle Status');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [memberModalTab, setMemberModalTab] = useState<'overview' | 'purchaseHistory'>('overview');

  // Filter members based on search and filters
  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership = membershipFilter === 'Alle Mitgliedschaften' ||
                             member.membershipType === membershipFilter;
    const matchesStatus = statusFilter === 'Alle Status' ||
                         member.status === statusFilter.toLowerCase();

    return matchesSearch && matchesMembership && matchesStatus;
  });

  // Calculate stats
  const stats = {
    vip: mockMembers.filter(m => m.membershipType === 'VIP').length,
    premium: mockMembers.filter(m => m.membershipType === 'Premium').length,
    basic: mockMembers.filter(m => m.membershipType === 'Basic').length,
    inactive: mockMembers.filter(m => m.status === 'expired').length
  };

  const handleExport = () => {
    console.log('Exporting members...');
  };

  const handleNewMember = () => {
    console.log('Creating new member...');
  };

  const handleSendEmail = (member: any) => {
    console.log(`Sending email to ${member.name}...`);
  };

  const handleAddCredits = (member: any) => {
    console.log(`Adding credits for ${member.name}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Mitgliederverwaltung</h2>
            <p className="text-slate-300">Verwalten Sie alle Ihre Studiomitglieder an einem Ort</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/members/new"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Neues Mitglied
            </Link>
            <button
              onClick={handleExport}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Mitglieder suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-slate-800/50 text-white"
            />
          </div>
          <select
            value={membershipFilter}
            onChange={(e) => setMembershipFilter(e.target.value)}
            className="border border-slate-600 rounded-lg px-3 py-2 bg-slate-800/50 text-white"
          >
            <option>Alle Mitgliedschaften</option>
            <option>VIP</option>
            <option>Premium</option>
            <option>Basic</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-600 rounded-lg px-3 py-2 bg-slate-800/50 text-white"
          >
            <option>Alle Status</option>
            <option>Aktiv</option>
            <option>Pausiert</option>
            <option>Abgelaufen</option>
          </select>
          <button className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">VIP Mitglieder</p>
                <p className="text-2xl font-bold text-white">{stats.vip}</p>
              </div>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Premium</p>
                <p className="text-2xl font-bold text-white">{stats.premium}</p>
              </div>
              <Users className="w-6 h-6 text-slate-300" />
            </div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Basic</p>
                <p className="text-2xl font-bold text-white">{stats.basic}</p>
              </div>
              <Calendar className="w-6 h-6 text-slate-300" />
            </div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Inaktiv</p>
                <p className="text-2xl font-bold text-red-400">{stats.inactive}</p>
              </div>
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-slate-900/60 rounded-2xl shadow-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/80 border-b border-slate-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">Mitglied</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">Mitgliedschaft</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">Letzter Besuch</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">Credits</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">Umsatz</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                      />
                      <div>
                        <p className="font-semibold text-white">{member.name}</p>
                        <p className="text-sm text-slate-300">{member.email}</p>
                        <p className="text-xs text-slate-400">{member.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      member.membershipType === 'VIP'
                        ? 'bg-purple-900/50 text-purple-300 border border-purple-700'
                        : member.membershipType === 'Premium'
                        ? 'bg-slate-900/50 text-red-300 border border-red-700'
                        : 'bg-slate-700 text-slate-200 border border-slate-600'
                    }`}>
                      {member.membershipType}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{member.contractLength}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {member.status === 'active' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium">Aktiv</span>
                        </>
                      ) : member.status === 'paused' ? (
                        <>
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span className="text-orange-400 font-medium">Pausiert</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-medium">Abgelaufen</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-slate-200">{new Date(member.lastVisit).toLocaleDateString('de-DE')}</p>
                    <p className="text-xs text-slate-400">{member.visits} Besuche total</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{member.credits}</p>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{width: `${(member.credits / 50) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-lg font-bold text-green-400">€{member.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">
                      Ø €{Math.round(member.totalSpent / member.visits)} pro Besuch
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="p-2 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="Details anzeigen"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => console.log(`Editing ${member.name}`)}
                        className="p-2 text-green-400 hover:bg-green-900/50 rounded-lg transition-colors"
                        title="Bearbeiten"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSendEmail(member)}
                        className="p-2 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="E-Mail senden"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Mitglied Details</h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-slate-700/50 rounded-lg"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Profile & Tab Navigation */}
                <div className="bg-slate-800/50 p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={selectedMember.avatar}
                      alt={selectedMember.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-slate-700 shadow-lg"
                    />
                    <div>
                      <h4 className="text-2xl font-bold text-white">{selectedMember.name}</h4>
                      <p className="text-slate-300 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedMember.email}
                      </p>
                      <p className="text-slate-300 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedMember.phone}
                      </p>
                    </div>
                  </div>

                  {/* Tab Buttons */}
                  <div className="flex border-b border-slate-700">
                    <button
                      onClick={() => setMemberModalTab('overview')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        memberModalTab === 'overview'
                          ? 'border-b-2 border-red-500 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}>
                      Übersicht
                    </button>
                    <button
                      onClick={() => setMemberModalTab('purchaseHistory')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        memberModalTab === 'purchaseHistory'
                          ? 'border-b-2 border-red-500 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}>
                      Kaufhistorie & Ausgaben
                    </button>
                  </div>
                </div>

                {memberModalTab === 'overview' ? (
                  <div className="space-y-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-2xl font-bold text-white">{selectedMember.visits}</p>
                        <p className="text-xs text-slate-400">Gesamtbesuche</p>
                      </div>
                      <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-2xl font-bold text-green-400">{selectedMember.credits}</p>
                        <p className="text-xs text-slate-400">Credits</p>
                      </div>
                      <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-2xl font-bold text-white">€{selectedMember.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">Gesamtumsatz</p>
                      </div>
                      <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-2xl font-bold text-white">
                          {selectedMember.id === 1 ? 290 : selectedMember.id === 2 ? 451 : 325}
                        </p>
                        <p className="text-xs text-slate-400">Tage Mitglied</p>
                      </div>
                    </div>
                    {/* Details */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                      <h5 className="text-lg font-semibold text-white mb-4">Mitgliedschaftsdetails</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Typ</p>
                          <p className="font-medium text-slate-100">{selectedMember.membershipType}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Laufzeit</p>
                          <p className="font-medium text-slate-100">{selectedMember.contractLength}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Nächste Zahlung</p>
                          <p className="font-medium text-slate-100">{selectedMember.nextPayment}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Lieblingskurs</p>
                          <p className="font-medium text-slate-100">{selectedMember.favoriteClass}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h5 className="text-lg font-semibold text-white mb-4">Kaufhistorie & Ausgabenanalyse</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-xs text-slate-400">Ausgaben (Monat)</p>
                        <p className="text-xl font-bold text-white">€{selectedMember.monthlySpending.toFixed(2)}</p>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-xs text-slate-400">Ausgaben (Ø pro Besuch)</p>
                        <p className="text-xl font-bold text-white">€{selectedMember.averageVisitSpending.toFixed(2)}</p>
                      </div>
                      <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-700">
                        <p className="text-xs text-purple-300">Autom. erkannte Top-Kategorie</p>
                        <p className="text-xl font-bold text-white">{selectedMember.preferredProducts[0]}</p>
                      </div>
                    </div>
                    <div className="overflow-y-auto max-h-60 pr-2">
                      <table className="w-full text-sm text-left">
                        <thead className="sticky top-0 bg-slate-800">
                          <tr>
                            <th className="p-2 text-slate-300">Datum</th>
                            <th className="p-2 text-slate-300">Artikel</th>
                            <th className="p-2 text-slate-300">Kategorie</th>
                            <th className="p-2 text-slate-300 text-right">Preis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedMember.purchaseHistory.map((item: any, index: number) => (
                            <tr key={index} className="border-b border-slate-700">
                              <td className="p-2 text-slate-400">{item.date}</td>
                              <td className="p-2 text-white">{item.item}</td>
                              <td className="p-2 text-slate-400">{item.category}</td>
                              <td className="p-2 text-white text-right">€{item.price.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Actions */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">Aktionen</h5>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAddCredits(selectedMember)}
                      className="w-full flex items-center gap-3 p-3 bg-slate-900/50 hover:bg-slate-800/50 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5 text-red-300" />
                      <span className="text-red-300 font-medium">Credits hinzufügen</span>
                    </button>
                    <Link
                      href="/dashboard/classes"
                      onClick={() => setSelectedMember(null)}
                      className="w-full flex items-center gap-3 p-3 bg-green-900/50 hover:bg-green-800/50 rounded-lg transition-colors"
                    >
                      <Calendar className="w-5 h-5 text-green-300" />
                      <span className="text-green-300 font-medium">Kurs buchen</span>
                    </Link>
                    <Link
                      href="/dashboard/payments"
                      onClick={() => setSelectedMember(null)}
                      className="w-full flex items-center gap-3 p-3 bg-purple-900/50 hover:bg-purple-800/50 rounded-lg transition-colors"
                    >
                      <CreditCard className="w-5 h-5 text-purple-300" />
                      <span className="text-purple-300 font-medium">Zahlung</span>
                    </Link>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">Notizen</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-900/30 rounded-lg border-l-4 border-yellow-500">
                      <p className="text-sm text-yellow-200">Bevorzugt {selectedMember.preferredTime}</p>
                    </div>
                    <div className="p-3 bg-slate-900/30 rounded-lg border-l-4 border-red-500">
                      <p className="text-sm text-red-200">Liebt {selectedMember.favoriteClass}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
