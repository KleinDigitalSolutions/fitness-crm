'use client'

import { useState } from 'react';
import { DollarSign, Clock, Users, CreditCard, CheckCircle, XCircle, Euro } from 'lucide-react';

// Mock data - will be replaced with real data from Supabase
const mockTransactions = [
  {
    id: 1,
    name: 'Sarah Mueller',
    amount: 65,
    type: 'Premium Mitgliedschaft',
    date: '30.10.2024',
    status: 'Bezahlt',
    method: 'SEPA Lastschrift'
  },
  {
    id: 2,
    name: 'Michael Schmidt',
    amount: 150,
    type: 'VIP Jahresabo',
    date: '29.10.2024',
    status: 'Bezahlt',
    method: 'Kreditkarte'
  },
  {
    id: 3,
    name: 'Anna Weber',
    amount: 65,
    type: 'Premium Mitgliedschaft',
    date: '28.10.2024',
    status: 'Überfällig',
    method: 'SEPA Lastschrift'
  },
  {
    id: 4,
    name: 'Thomas Bauer',
    amount: 45,
    type: 'Personal Training',
    date: '27.10.2024',
    status: 'Bezahlt',
    method: 'PayPal'
  },
  {
    id: 5,
    name: 'Julia Richter',
    amount: 35,
    type: 'Basic Mitgliedschaft',
    date: '26.10.2024',
    status: 'Bezahlt',
    method: 'Kreditkarte'
  },
  {
    id: 6,
    name: 'Max Klein',
    amount: 150,
    type: 'VIP Jahresabo',
    date: '25.10.2024',
    status: 'Ausstehend',
    method: 'SEPA Lastschrift'
  },
  {
    id: 7,
    name: 'Lisa Schmidt',
    amount: 65,
    type: 'Premium Mitgliedschaft',
    date: '24.10.2024',
    status: 'Bezahlt',
    method: 'SEPA Lastschrift'
  },
  {
    id: 8,
    name: 'Tom Wagner',
    amount: 20,
    type: 'Tageskarte',
    date: '23.10.2024',
    status: 'Bezahlt',
    method: 'Bar'
  }
];

export default function PaymentsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Calculate stats
  const stats = {
    monthlyRevenue: mockTransactions
      .filter(t => t.status === 'Bezahlt')
      .reduce((sum, t) => sum + t.amount, 0),
    openInvoices: mockTransactions
      .filter(t => t.status === 'Überfällig' || t.status === 'Ausstehend')
      .reduce((sum, t) => sum + t.amount, 0),
    averagePerMember: 97
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Zahlungsverwaltung</h2>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/70 p-6 rounded-xl border-l-4 border-green-500 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Monatsumsatz</p>
                <p className="text-3xl font-bold text-white">
                  €{stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/70 p-6 rounded-xl border-l-4 border-red-500 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Offene Rechnungen</p>
                <p className="text-3xl font-bold text-white">
                  €{stats.openInvoices.toLocaleString()}
                </p>
              </div>
              <Clock className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/70 p-6 rounded-xl border-l-4 border-purple-500 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Durchschnitt/Mitglied</p>
                <p className="text-3xl font-bold text-white">€{stats.averagePerMember}</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800/60 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Letzte Transaktionen</h3>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-slate-700/70 rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.name}</p>
                    <p className="text-sm text-slate-300">{transaction.type}</p>
                    <p className="text-xs text-slate-400">{transaction.date} • {transaction.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">€{transaction.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    transaction.status === 'Bezahlt'
                      ? 'bg-green-900/50 text-green-300'
                      : transaction.status === 'Überfällig'
                      ? 'bg-red-900/50 text-red-300'
                      : 'bg-yellow-900/50 text-yellow-300'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Transaktionsdetails</h3>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Kunde</p>
                    <p className="text-white font-semibold">{selectedTransaction.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Betrag</p>
                    <p className="text-white font-semibold">€{selectedTransaction.amount}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Typ</p>
                    <p className="text-white font-semibold">{selectedTransaction.type}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Datum</p>
                    <p className="text-white font-semibold">{selectedTransaction.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Zahlungsmethode</p>
                    <p className="text-white font-semibold">{selectedTransaction.method}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedTransaction.status === 'Bezahlt' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-semibold">Bezahlt</span>
                        </>
                      ) : selectedTransaction.status === 'Überfällig' ? (
                        <>
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-semibold">Überfällig</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">Ausstehend</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  Schließen
                </button>
                {selectedTransaction.status !== 'Bezahlt' && (
                  <button
                    onClick={() => console.log('Marking as paid...')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Als Bezahlt markieren
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
