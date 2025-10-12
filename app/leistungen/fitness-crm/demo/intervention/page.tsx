'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Users, 
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  Target,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Send,
  UserMinus,
  Heart,
  Gift,
  Percent,
  Bell,
  BarChart3,
  Filter,
  Search,
  Plus,
  Play,
  Pause,
  Settings,
  Eye,
  X,
  ChevronRight,
  Star,
  Euro,
  MessageSquare,
  Smartphone,
  HelpCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function InterventionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIntervention, setSelectedIntervention] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('Alle Risiken');
  const [statusFilter, setStatusFilter] = useState('Alle Status');
  const [showNewInterventionModal, setShowNewInterventionModal] = useState(false);
  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<any>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Tooltip-Konfigurationen für Interventions-System
  const tooltips = {
    totalInterventions: "🎯 Gesamtanzahl aller durchgeführten Interventionen. System trackt automatisch alle Kampagnen und deren ROI.",
    activeInterventions: "⚡ Derzeit laufende Automatisierungs-Kampagnen. KI optimiert Timing und Inhalte basierend auf Erfolgsraten.",
    successRate: "📈 Erfolgsrate aller Interventionen. Machine Learning verbessert kontinuierlich die Targeting-Algorithmen.",
    responseTime: "⏱️ Durchschnittliche Zeit bis zur Mitglieder-Reaktion. Automatische A/B-Tests optimieren Sendezeiten.",
    membersSaved: "💪 Anzahl zurückgewonnener Mitglieder. ROI-Tracking zeigt direkten Geschäftswert der Automatisierung.",
    revenueRecovered: "💰 Durch Interventionen geretteter Umsatz. Vollautomatisches Tracking von Conversion zu Umsatz.",
    whatsappAutomation: "📱 KI-gesteuerte WhatsApp-Kampagnen mit personalisierten Nachrichten basierend auf Mitgliederprofil und Verhalten.",
    emailAutomation: "✉️ Mehrstufige E-Mail-Serien mit dynamischen Inhalten. A/B-Testing optimiert Betreffzeilen und CTAs automatisch.",
    smsAutomation: "📟 Zeitgesteuerte SMS mit ortsspezifischen Angeboten. Geofencing löst Location-basierte Nachrichten aus.",
    callAutomation: "☎️ CRM integriert Anrufverwaltung mit Erfolgs-Tracking. Automatische Termin-Buchungslinks nach Gesprächen.",
    discountAutomation: "🎁 Dynamische Rabatte basierend auf Mitglieder-Lifetime-Value. KI berechnet optimale Angebotshöhe.",
    buddyAutomation: "👥 ML-Algorithmus matcht Mitglieder basierend auf Trainingszeiten, Zielen und Persönlichkeit."
  };

  // Tooltip-Komponente
  const TooltipWrapper = ({ children, tooltipKey, className = "" }: { children: React.ReactNode, tooltipKey: string, className?: string }) => (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setActiveTooltip(tooltipKey)}
      onMouseLeave={() => setActiveTooltip(null)}
    >
      {children}
      <HelpCircle className="w-4 h-4 text-slate-400 hover:text-violet-400 cursor-help ml-2 inline-block" />
      
      <AnimatePresence>
        {activeTooltip === tooltipKey && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bg-slate-800 border border-violet-500/50 rounded-xl p-4 shadow-2xl max-w-sm -top-2 left-full ml-2"
            style={{ minWidth: '320px' }}
          >
            <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-slate-800"></div>
            <p className="text-white text-sm leading-relaxed">{tooltips[tooltipKey as keyof typeof tooltips]}</p>
            <div className="mt-2 text-xs text-violet-400 flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              KI-Automatisierung aktiv
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Realistische Mitglieder mit Risiko-Profilen
  const riskMembers = [
    {
      id: 1,
      name: 'Sarah Weber',
      email: 'sarah.weber@email.com',
      phone: '+49 176 123 456 78',
      riskLevel: 'Hoch',
      riskScore: 85,
      lastVisit: '2024-09-15',
      daysSinceVisit: 45,
      membershipType: 'Premium',
      issues: ['Lange Inaktivität', 'Verpasste Termine', 'Keine App-Nutzung'],
      interventions: [
        { type: 'WhatsApp', status: 'Geplant', date: '2024-11-02' },
        { type: 'E-Mail', status: 'Gesendet', date: '2024-10-28' }
      ],
      totalSpent: 450,
      joinDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Michael Schmidt',
      email: 'michael.schmidt@email.com', 
      phone: '+49 176 987 654 32',
      riskLevel: 'Mittel',
      riskScore: 62,
      lastVisit: '2024-10-18',
      daysSinceVisit: 12,
      membershipType: 'Standard',
      issues: ['Sinkende Besuchsfrequenz', 'Keine Kursbuchungen'],
      interventions: [
        { type: 'Persönlicher Anruf', status: 'Abgeschlossen', date: '2024-10-25' }
      ],
      totalSpent: 280,
      joinDate: '2023-11-20'
    },
    {
      id: 3,
      name: 'Lisa Müller',
      email: 'lisa.mueller@email.com',
      phone: '+49 176 555 777 99',
      riskLevel: 'Hoch',
      riskScore: 78,
      lastVisit: '2024-09-28',
      daysSinceVisit: 32,
      membershipType: 'Premium',
      issues: ['Verpasste Personal Training', 'Keine Reaktion auf E-Mails'],
      interventions: [
        { type: 'SMS', status: 'Gesendet', date: '2024-10-30' },
        { type: 'Rabatt-Angebot', status: 'Geplant', date: '2024-11-03' }
      ],
      totalSpent: 650,
      joinDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Thomas Beck',
      email: 'thomas.beck@email.com',
      phone: '+49 176 333 222 11',
      riskLevel: 'Niedrig',
      riskScore: 35,
      lastVisit: '2024-10-28',
      daysSinceVisit: 2,
      membershipType: 'Standard',
      issues: ['Leichte Aktivitätsreduktion'],
      interventions: [],
      totalSpent: 320,
      joinDate: '2023-08-05'
    }
  ];

  // Verfügbare Automatisierungen
  const automationTemplates = [
    {
      id: 1,
      name: 'WhatsApp Reaktivierung',
      description: 'Persönliche WhatsApp-Nachricht mit individuellem Angebot',
      channel: 'WhatsApp',
      trigger: 'Nach 14 Tagen Inaktivität',
      successRate: 68,
      template: 'Hallo {{name}}! 🏋️‍♀️ Wir vermissen dich im Studio. Wie wäre es mit einem kostenlosen Personal Training? Antworte einfach mit "JA" und wir vereinbaren einen Termin.',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'green'
    },
    {
      id: 2,
      name: 'E-Mail Wiederbelebung',
      description: 'Mehrstufige E-Mail-Kampagne mit progressiven Angeboten',
      channel: 'E-Mail',
      trigger: 'Nach 21 Tagen Inaktivität',
      successRate: 45,
      template: 'Betreff: {{name}}, dein Fitness-Comeback wartet! 💪\n\nHallo {{name}},\n\nwir haben bemerkt, dass du uns schon eine Weile nicht besucht hast. Das passiert jedem - das Wichtige ist, wieder anzufangen!\n\nSpeziell für dich: 50% Rabatt auf alle Kurse in den nächsten 2 Wochen.',
      icon: <Mail className="w-6 h-6" />,
      color: 'blue'
    },
    {
      id: 3,
      name: 'SMS Schnell-Reaktivierung',
      description: 'Kurze, direkte SMS mit zeitlimitiertem Angebot',
      channel: 'SMS',
      trigger: 'Nach 30 Tagen Inaktivität',
      successRate: 52,
      template: 'Hi {{name}}! 🎯 Nur heute: Kostenloser Eintritt + gratis Shake. Komm vorbei bis 20 Uhr. Dein FitStudio Team',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Persönlicher Anruf',
      description: 'Trainer ruft persönlich an für individuelle Beratung',
      channel: 'Telefon',
      trigger: 'Nach 45 Tagen Inaktivität',
      successRate: 75,
      template: 'Gesprächsleitfaden:\n1. Persönliche Begrüßung\n2. Nach Wohlbefinden fragen\n3. Gründe für Auszeit erfragen\n4. Individuelle Lösung anbieten\n5. Konkreten Termin vereinbaren',
      icon: <Phone className="w-6 h-6" />,
      color: 'yellow'
    },
    {
      id: 5,
      name: 'Rabatt-Offensive',
      description: 'Gestaffelte Rabattangebote je nach Inaktivitätsdauer',
      channel: 'E-Mail + WhatsApp',
      trigger: 'Nach 60 Tagen Inaktivität',
      successRate: 35,
      template: '🎉 {{name}}, wir wollen dich zurück!\n\n• 1 Monat gratis bei Rückkehr\n• Kostenlose Ernährungsberatung\n• Persönlicher Trainingsplan\n\nNur gültig bis {{deadline}}.',
      icon: <Gift className="w-6 h-6" />,
      color: 'red'
    },
    {
      id: 6,
      name: 'Buddy-System Aktivierung',
      description: 'Vermittlung eines Trainingspartners aus aktiven Mitgliedern',
      channel: 'App + E-Mail',
      trigger: 'Bei sozialer Isolation',
      successRate: 58,
      template: 'Hallo {{name}}! 👥 Wir haben den perfekten Trainingspartner für dich gefunden: {{buddy_name}}. Gleiche Ziele, ähnlicher Trainingsstand. Interesse an einem gemeinsamen Probetraining?',
      icon: <Users className="w-6 h-6" />,
      color: 'indigo'
    }
  ];

  // Aktive Interventionen mit Verlauf
  const activeInterventions = [
    {
      id: 1,
      member: 'Sarah Weber',
      type: 'WhatsApp Reaktivierung',
      status: 'Läuft',
      startDate: '2024-10-28',
      lastAction: '2024-10-30',
      nextAction: '2024-11-02',
      progress: 60,
      responses: 1,
      conversions: 0,
      timeline: [
        { date: '2024-10-28', action: 'Kampagne gestartet', status: 'success' },
        { date: '2024-10-29', action: 'E-Mail geöffnet', status: 'success' },
        { date: '2024-10-30', action: 'WhatsApp gelesen', status: 'success' },
        { date: '2024-11-02', action: 'Follow-up geplant', status: 'pending' }
      ]
    },
    {
      id: 2,
      member: 'Michael Schmidt',
      type: 'Persönlicher Anruf',
      status: 'Erfolgreich',
      startDate: '2024-10-25',
      lastAction: '2024-10-25',
      nextAction: null,
      progress: 100,
      responses: 1,
      conversions: 1,
      timeline: [
        { date: '2024-10-25', action: 'Anruf durchgeführt', status: 'success' },
        { date: '2024-10-25', action: 'Termin vereinbart', status: 'success' },
        { date: '2024-10-26', action: 'Mitglied zurückgekehrt', status: 'success' }
      ]
    },
    {
      id: 3,
      member: 'Lisa Müller',
      type: 'SMS Schnell-Reaktivierung',
      status: 'Wartend',
      startDate: '2024-10-30',
      lastAction: '2024-10-30',
      nextAction: '2024-11-01',
      progress: 25,
      responses: 0,
      conversions: 0,
      timeline: [
        { date: '2024-10-30', action: 'SMS versendet', status: 'success' },
        { date: '2024-11-01', action: 'Follow-up E-Mail geplant', status: 'pending' }
      ]
    }
  ];

  // Statistiken
  const stats = {
    totalInterventions: 24,
    activeInterventions: 8,
    successRate: 65,
    avgResponseTime: '2.3 Stunden',
    membersSaved: 18,
    revenueRecovered: 8450
  };

  const filteredMembers = riskMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'Alle Risiken' || member.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Hoch': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'Mittel': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Niedrig': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Läuft': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Erfolgreich': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Wartend': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Fehlgeschlagen': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
          <TooltipWrapper tooltipKey="totalInterventions" className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm flex items-center">
                Gesamt Interventionen
              </p>
              <p className="text-2xl font-bold text-white">{stats.totalInterventions}</p>
            </div>
            <Target className="w-8 h-8 text-violet-500" />
          </TooltipWrapper>
        </div>
        
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
          <TooltipWrapper tooltipKey="activeInterventions" className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm flex items-center">
                Aktive Kampagnen
              </p>
              <p className="text-2xl font-bold text-white">{stats.activeInterventions}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-500" />
          </TooltipWrapper>
        </div>
        
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
          <TooltipWrapper tooltipKey="successRate" className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm flex items-center">
                Erfolgsrate
              </p>
              <p className="text-2xl font-bold text-green-400">{stats.successRate}%</p>
            </div>
            <TrendingDown className="w-8 h-8 text-green-500" />
          </TooltipWrapper>
        </div>
        
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
          <TooltipWrapper tooltipKey="responseTime" className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm flex items-center">
                Ø Reaktionszeit
              </p>
              <p className="text-2xl font-bold text-white">{stats.avgResponseTime}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </TooltipWrapper>
        </div>
        
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
          <TooltipWrapper tooltipKey="membersSaved" className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm flex items-center">
                Gerettete Mitglieder
              </p>
              <p className="text-2xl font-bold text-white">{stats.membersSaved}</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </TooltipWrapper>
        </div>
        
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
          <TooltipWrapper tooltipKey="revenueRecovered" className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm flex items-center">
                Umsatz gerettet
              </p>
              <p className="text-2xl font-bold text-white">€{stats.revenueRecovered.toLocaleString()}</p>
            </div>
            <Euro className="w-8 h-8 text-green-500" />
          </TooltipWrapper>
        </div>
      </div>

      {/* Automatisierungs-Vorlagen */}
      <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Automatisierungs-Vorlagen</h3>
          <button 
            onClick={() => setShowAutomationModal(true)}
            className="flex items-center space-x-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Neue Vorlage</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {automationTemplates.map((template) => {
            // Mapping der Template-IDs zu Tooltip-Keys
            const tooltipKey = {
              1: 'whatsappAutomation',
              2: 'emailAutomation', 
              3: 'smsAutomation',
              4: 'callAutomation',
              5: 'discountAutomation',
              6: 'buddyAutomation'
            }[template.id] || 'whatsappAutomation';

            return (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 cursor-pointer hover:border-violet-500/50"
                onClick={() => setSelectedAutomation(template)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-${template.color}-500/10 border border-${template.color}-500/30`}>
                    {template.icon}
                  </div>
                  <span className="text-sm text-green-400 font-semibold">{template.successRate}%</span>
                </div>
                
                <TooltipWrapper tooltipKey={tooltipKey} className="mb-2">
                  <h4 className="font-semibold text-white">{template.name}</h4>
                </TooltipWrapper>
                <p className="text-slate-400 text-sm mb-3">{template.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Kanal: {template.channel}</span>
                  <span className="text-violet-400">{template.trigger}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderRiskMembers = () => (
    <div className="space-y-6">
      {/* Filter und Suche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Mitglied suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
          />
        </div>
        
        <select 
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 text-sm min-w-0 w-auto"
        >
          <option>Alle Risiken</option>
          <option>Hoch</option>
          <option>Mittel</option>
          <option>Niedrig</option>
        </select>
        
        <button 
          onClick={() => setShowNewInterventionModal(true)}
          className="flex items-center space-x-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Intervention starten</span>
        </button>
      </div>

      {/* Mitglieder Liste */}
      <div className="grid gap-4">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 border border-slate-700 rounded-xl p-6 hover:border-violet-500/50 transition-all cursor-pointer"
            onClick={() => setSelectedIntervention(member)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getRiskColor(member.riskLevel)}`}>
                    {member.riskLevel} Risiko
                  </span>
                  <span className="text-slate-400 text-sm">Score: {member.riskScore}/100</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-xs">Letzter Besuch</p>
                    <p className="text-white text-sm">{member.lastVisit}</p>
                    <p className="text-red-400 text-xs">vor {member.daysSinceVisit} Tagen</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Mitgliedschaft</p>
                    <p className="text-white text-sm">{member.membershipType}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Gesamtumsatz</p>
                    <p className="text-white text-sm">€{member.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Aktive Interventionen</p>
                    <p className="text-white text-sm">{member.interventions.length}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-slate-400 text-xs mb-2">Erkannte Probleme:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.issues.map((issue, index) => (
                      <span key={index} className="px-2 py-1 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
                
                {member.interventions.length > 0 && (
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Laufende Interventionen:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.interventions.map((intervention, index) => (
                        <span key={index} className={`px-2 py-1 rounded-lg text-xs border ${getStatusColor(intervention.status)}`}>
                          {intervention.type} - {intervention.status}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderActiveInterventions = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        {activeInterventions.map((intervention) => (
          <div key={intervention.id} className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">{intervention.member}</h4>
                <p className="text-slate-400">{intervention.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-sm border ${getStatusColor(intervention.status)}`}>
                {intervention.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-slate-400 text-xs">Gestartet</p>
                <p className="text-white text-sm">{intervention.startDate}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Letzte Aktion</p>
                <p className="text-white text-sm">{intervention.lastAction}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Nächste Aktion</p>
                <p className="text-white text-sm">{intervention.nextAction || 'Abgeschlossen'}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Fortschritt</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-violet-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${intervention.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm">{intervention.progress}%</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-white font-medium mb-3">Timeline</h5>
              <div className="space-y-2">
                {intervention.timeline.map((event, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      event.status === 'success' ? 'bg-green-500' : 
                      event.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-slate-400 text-sm">{event.date}</span>
                    <span className="text-white text-sm">{event.action}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="flex space-x-6">
                <div>
                  <p className="text-slate-400 text-xs">Antworten</p>
                  <p className="text-white text-sm">{intervention.responses}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Conversions</p>
                  <p className="text-white text-sm">{intervention.conversions}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all">
                  <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all">
                  <Settings className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/leistungen/website/fitness-crm" className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Mitglieder-Interventionen</h1>
                <p className="text-slate-400">Automatisierte Reaktivierung und Bindung</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">8 Aktive Kampagnen</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl mb-8">
          {[
            { id: 'overview', label: 'Übersicht', icon: BarChart3 },
            { id: 'risk-members', label: 'Risiko-Mitglieder', icon: AlertTriangle },
            { id: 'active', label: 'Aktive Interventionen', icon: Zap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'risk-members' && renderRiskMembers()}
          {activeTab === 'active' && renderActiveInterventions()}
        </motion.div>
      </div>

      {/* Automation Details Modal */}
      <AnimatePresence>
        {selectedAutomation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAutomation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedAutomation.name}</h3>
                <button 
                  onClick={() => setSelectedAutomation(null)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Beschreibung</h4>
                  <p className="text-slate-300">{selectedAutomation.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Kanal</h4>
                    <p className="text-slate-300">{selectedAutomation.channel}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Erfolgsrate</h4>
                    <p className="text-green-400 text-xl font-bold">{selectedAutomation.successRate}%</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Auslöser</h4>
                  <p className="text-slate-300">{selectedAutomation.trigger}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Vorlage</h4>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <pre className="text-slate-300 text-sm whitespace-pre-wrap">{selectedAutomation.template}</pre>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-all">
                    Automation aktivieren
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all">
                    Vorlage bearbeiten
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}