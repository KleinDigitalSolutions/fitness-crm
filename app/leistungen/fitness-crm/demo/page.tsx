'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Bell,
  Star,
  Clock,
  TrendingUp,
  DollarSign,
  Activity,
  Mail,
  Target,
  Zap,
  UserPlus,
  Euro,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  X,
  HelpCircle,
  Info,
  ChevronLeft,
  LogOut
} from 'lucide-react';

export default function FitnessCRMDemo() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  
  // Interactive demo states
  const [searchTerm, setSearchTerm] = useState('');
  const [membershipFilter, setMembershipFilter] = useState('Alle Mitgliedschaften');
  const [statusFilter, setStatusFilter] = useState('Alle Status');
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  const [showNotification, setShowNotification] = useState('');
  const [bookingClass, setBookingClass] = useState<any>(null);
  const [memberModalTab, setMemberModalTab] = useState('overview');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Hinzufügen eines useEffect-Hooks zur Simulation von Live-Daten-Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prevAnalytics => ({
        ...prevAnalytics,
        activeMembers: prevAnalytics.activeMembers + Math.floor(Math.random() * 3) - 1,
        monthlyRevenue: prevAnalytics.monthlyRevenue + Math.floor(Math.random() * 100) - 40,
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Tooltip-Konfigurationen mit realistischen Automatisierungsmöglichkeiten
  const tooltips = {
    dashboard: "📊 Live-Dashboard mit automatischer Datenaktualisierung alle 5 Minuten. KI analysiert Trends und sendet Alerts bei Anomalien.",
    members: "👥 Mitgliederdatenbank mit automatischem Lead-Scoring. Neue Mitglieder werden automatisch kategorisiert und Willkommensnachrichten versendet.",
    classes: "🏃‍♀️ Automatische Kursbuchung mit Wartelisten-Management. SMS/WhatsApp-Erinnerungen 2h vor Kursbeginn.",
    finance: "💰 Automatische Rechnungsstellung, Mahnwesen und SEPA-Lastschriften. Zahlungserinnerungen via E-Mail/SMS.",
    analytics: "📈 KI-basierte Vorhersagen für Mitgliederentwicklung, Kündigungsrisiko und Umsatzprognosen mit automatischen Reports.",
    memberGrowth: "📊 Automatisches Tracking aller Mitgliederbewegungen. Algorithmus erkennt Wachstumsmuster und optimiert Marketing-Timing.",
    revenue: "💸 Live-Umsatztracking mit automatischer Kategorisierung. E-Mail-Reports jeden Montag an Management.",
    retention: "💪 KI erkennt Kündigungsrisiko anhand von Besuchsmustern. Automatische Interventions-Kampagnen bei Risiko-Mitgliedern.",
    bookings: "📅 Smart-Booking mit automatischer Wartelisten-Verwaltung. WhatsApp-Bot für Buchungen und Stornierungen.",
    intervention: "🚨 Automatisches Risiko-Scoring basierend auf Besuchsfrequenz, App-Nutzung und Zahlungsverhalten. Trigger für Interventionen.",
    purchaseHistory: "🛒 Produktdaten-Integration: POS-System (Kassensystem) synct automatisch mit CRM via API. NFC/RFID-Armbänder tracken Käufe in Echtzeit. Getränkeautomaten mit IoT-Sensoren melden Verkäufe automatisch. Supplement-Shop mit Barcode-Scanner erfasst alle Transaktionen. Machine Learning analysiert Kaufmuster für personalisierte Angebote."
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
            style={{ minWidth: '280px' }}
          >
            <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-slate-800"></div>
            <p className="text-white text-sm leading-relaxed">{tooltips[tooltipKey as keyof typeof tooltips]}</p>
            <div className="mt-2 text-xs text-violet-400 flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              Automatisierung verfügbar
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Demo data - Realistische Mitgliederdaten mit Kaufhistorie
  const members = [
    {
      id: 1,
      name: 'Sarah Mueller',
      email: 'sarah.mueller@email.com',
      phone: '+49 176 12345678',
      membershipType: 'Premium',
      joinDate: '2024-01-15',
      lastVisit: '2024-10-30',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b34c8c30?w=150',
      credits: 25,
      totalSpent: 1250,
      monthlyFee: 79.90,
      nextPayment: '2024-11-15',
      contractLength: '12 Monate',
      visits: 45,
      favoriteClass: 'Yoga',
      preferredTime: 'Morgens',
      loyaltyPoints: 1850,
      loyaltyTier: 'Gold',
      purchaseHistory: [
        { date: '2024-10-28', item: 'Protein Shake Vanille', price: 4.50, category: 'Supplements' },
        { date: '2024-10-25', item: 'Handtuch Premium', price: 15.90, category: 'Zubehör' },
        { date: '2024-10-22', item: 'BCAA Drink', price: 3.20, category: 'Supplements' },
        { date: '2024-10-20', item: 'Energy Bar', price: 2.80, category: 'Snacks' },
        { date: '2024-10-18', item: 'Isotonisches Getränk', price: 2.50, category: 'Getränke' }
      ],
      monthlySpending: 89.40,
      averageVisitSpending: 5.20,
      preferredProducts: ['Protein Shakes', 'Yoga-Zubehör', 'Gesunde Snacks']
    },
    {
      id: 2,
      name: 'Michael Schmidt',
      email: 'michael.schmidt@email.com',
      phone: '+49 176 87654321',
      membershipType: 'VIP',
      joinDate: '2023-08-05',
      lastVisit: '2024-10-30',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      credits: 50,
      totalSpent: 3200,
      monthlyFee: 149.90,
      nextPayment: '2024-11-05',
      contractLength: '24 Monate',
      visits: 89,
      favoriteClass: 'CrossFit',
      preferredTime: 'Abends',
      loyaltyPoints: 4250,
      loyaltyTier: 'Platin',
      purchaseHistory: [
        { date: '2024-10-29', item: 'Whey Protein 1kg', price: 49.90, category: 'Supplements' },
        { date: '2024-10-28', item: 'Pre-Workout Booster', price: 24.90, category: 'Supplements' },
        { date: '2024-10-26', item: 'Protein Riegel 6er Pack', price: 18.50, category: 'Snacks' },
        { date: '2024-10-24', item: 'Sporttasche Premium', price: 89.90, category: 'Ausrüstung' },
        { date: '2024-10-22', item: 'Creatine Monohydrat', price: 19.90, category: 'Supplements' }
      ],
      monthlySpending: 245.80,
      averageVisitSpending: 12.40,
      preferredProducts: ['Protein-Supplements', 'Pre-Workout', 'Ausrüstung']
    },
    {
      id: 3,
      name: 'Anna Weber',
      email: 'anna.weber@email.com',
      phone: '+49 176 11223344',
      membershipType: 'Premium',
      joinDate: '2023-11-10',
      lastVisit: '2024-10-28',
      status: 'expired',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      credits: 0,
      totalSpent: 2100,
      monthlyFee: 79.90,
      nextPayment: 'Abgelaufen',
      contractLength: '12 Monate',
      visits: 156,
      favoriteClass: 'Pilates',
      preferredTime: 'Mittags',
      loyaltyPoints: 890, // Punkte verfallen bei Kündigung nach 30 Tagen
      loyaltyTier: 'Silber',
      purchaseHistory: [
        { date: '2024-09-15', item: 'Pilates Matte', price: 39.90, category: 'Ausrüstung' },
        { date: '2024-09-10', item: 'Vitamin D3', price: 16.90, category: 'Supplements' },
        { date: '2024-09-08', item: 'Protein Shake Schoko', price: 4.50, category: 'Supplements' }
      ],
      monthlySpending: 45.20,
      averageVisitSpending: 2.90,
      preferredProducts: ['Pilates-Zubehör', 'Wellness-Produkte']
    }
  ];

  const classes = [
    {
      id: 1,
      name: 'Morning Yoga',
      instructor: 'Lisa Chen',
      time: '08:00 - 09:00',
      date: '2024-11-01',
      capacity: 20,
      booked: 15,
      price: 25,
      status: 'scheduled',
      difficulty: 'Anfänger',
      category: 'Entspannung',
      description: 'Sanfte Yoga-Praxis für einen energievollen Start in den Tag'
    },
    {
      id: 2,
      name: 'HIIT Training',
      instructor: 'Mark Johnson',
      time: '18:00 - 19:00',
      date: '2024-11-01',
      capacity: 15,
      booked: 12,
      price: 30,
      status: 'scheduled',
      difficulty: 'Fortgeschritten',
      category: 'Cardio',
      description: 'Hochintensives Intervalltraining für maximale Fettverbrennung'
    },
    {
      id: 3,
      name: 'Pilates',
      instructor: 'Sophie Turner',
      time: '10:00 - 11:00',
      date: '2024-11-01',
      capacity: 12,
      booked: 8,
      price: 28,
      status: 'scheduled',
      difficulty: 'Mittel',
      category: 'Kraft',
      description: 'Körperbeherrschung und Stabilität durch kontrollierte Bewegungen'
    },
    {
      id: 4,
      name: 'Spinning Class',
      instructor: 'Alex Rivera',
      time: '19:00 - 20:00',
      date: '2024-11-01',
      capacity: 25,
      booked: 22,
      price: 35,
      status: 'scheduled',
      difficulty: 'Fortgeschritten',
      category: 'Cardio',
      description: 'Intensive Fahrradeinheit mit motivierender Musik'
    },
    {
      id: 5,
      name: 'Zumba',
      instructor: 'Maria Santos',
      time: '17:00 - 18:00',
      date: '2024-11-01',
      capacity: 30,
      booked: 25,
      price: 22,
      status: 'scheduled',
      difficulty: 'Anfänger',
      category: 'Tanz',
      description: 'Lateinamerikanische Tänze für Fitness und Spaß'
    },
    {
      id: 6,
      name: 'CrossFit',
      instructor: 'Jake Thompson',
      time: '20:00 - 21:00',
      date: '2024-11-01',
      capacity: 12,
      booked: 10,
      price: 40,
      status: 'scheduled',
      difficulty: 'Experte',
      category: 'Kraft',
      description: 'Funktionelles Training für maximale Leistungssteigerung'
    }
  ];

  const [analytics, setAnalytics] = useState({
    totalMembers: 247,
    activeMembers: 227, // Konsistent mit Chart-Endwert
    pausedMembers: 12,
    expiredMembers: 8,  // Angepasst damit total stimmt (227+12+8=247)
    monthlyRevenue: 18420,
    classesThisWeek: 35,
    memberGrowth: '+12.5%',
    revenueGrowth: '+8.3%',
    avgClassAttendance: '78%',
    memberRetention: '92%',
    avgVisitsPerMember: 3.2,
    mostPopularClass: 'Zumba',
    peakHours: '18:00-20:00'
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'members', label: 'Mitglieder', icon: Users },
    { id: 'classes', label: 'Kurse', icon: Calendar },
    { id: 'payments', label: 'Zahlungen', icon: CreditCard },
    { id: 'analytics', label: 'KI Analytics', icon: TrendingUp }
  ];

  // Demo functions
  const showDemoNotification = (message: string) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(''), 3000);
  };

  const handleNewMember = () => {
    setShowNewMemberModal(true);
    showDemoNotification('Neues Mitglied Formular geöffnet');
  };

  const handleExport = () => {
    showDemoNotification('Mitgliederdaten werden exportiert...');
  };

  const handleBookClass = (classItem: any) => {
    setBookingClass(classItem);
    showDemoNotification(`Buchung für ${classItem.name} wird verarbeitet...`);
    setTimeout(() => setBookingClass(null), 2000);
  };

  const handleAddCredits = (member: any) => {
    showDemoNotification(`Credits für ${member.name} hinzugefügt`);
  };

  const handleSendEmail = (member: any) => {
    showDemoNotification(`E-Mail an ${member.name} gesendet`);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership = membershipFilter === 'Alle Mitgliedschaften' || 
                             member.membershipType === membershipFilter;
    const matchesStatus = statusFilter === 'Alle Status' || 
                         member.status === statusFilter.toLowerCase();
    return matchesSearch && matchesMembership && matchesStatus;
  });

  // KI Analytics Data
  const aiAnalytics = {
    customerSegments: [
      { 
        name: 'Power User', 
        count: 45, 
        avgSpend: 180, 
        predictedChurn: 15,
        preferredProducts: ['Protein Shakes', 'Sporttaschen', 'Supplements'],
        visitFrequency: 5.2,
        peakTimes: ['18:00-20:00'],
        description: 'Hochfrequente Nutzer mit hoher Kaufbereitschaft'
      },
      { 
        name: 'Gelegenheitsnutzer', 
        count: 89, 
        avgSpend: 45, 
        predictedChurn: 35,
        preferredProducts: ['Getränke', 'Handtücher', 'Snacks'],
        visitFrequency: 2.1,
        peakTimes: ['10:00-12:00', '16:00-18:00'],
        description: 'Moderate Nutzung, Potenzial für Upselling'
      },
      { 
        name: 'Newcomer', 
        count: 67, 
        avgSpend: 25, 
        predictedChurn: 65,
        preferredProducts: ['Grundausstattung', 'Einsteiger-Supplements'],
        visitFrequency: 1.8,
        peakTimes: ['19:00-21:00'],
        description: 'Neue Mitglieder mit hohem Betreuungsbedarf'
      }
    ],
    productRecommendations: [
      {
        product: 'Post-Workout Shake',
        confidence: 87,
        targetSegment: 'Power User',
        expectedRevenue: 2340,
        reasoning: 'Hohe Korrelation zwischen Trainingsfrequenz und Protein-Konsum'
      },
      {
        product: 'Fitness Tracker',
        confidence: 72,
        targetSegment: 'Newcomer',
        expectedRevenue: 1580,
        reasoning: 'Newcomer zeigen 65% höhere Retention mit Tracking-Geräten'
      },
      {
        product: 'Premium Handtücher',
        confidence: 91,
        targetSegment: 'Gelegenheitsnutzer',
        expectedRevenue: 890,
        reasoning: 'Comfort-Produkte steigern Besuchsfrequenz um 23%'
      }
    ],
    salesOptimization: {
      bestSellingTimes: ['17:30-19:00', '12:00-13:30'],
      seasonalTrends: {
        Q1: { trend: '+45%', reason: 'Neujahrsvorsätze' },
        Q2: { trend: '+12%', reason: 'Sommer-Vorbereitung' },
        Q3: { trend: '-8%', reason: 'Urlaubszeit' },
        Q4: { trend: '+23%', reason: 'Weihnachtsgeschenke' }
      },
      priceOptimization: {
        proteinShakes: { currentPrice: 4.50, suggestedPrice: 4.80, expectedIncrease: '+18%' },
        supplements: { currentPrice: 25.00, suggestedPrice: 27.50, expectedIncrease: '+12%' },
        merchandise: { currentPrice: 15.00, suggestedPrice: 14.20, expectedIncrease: '+25%' }
      }
    },
    churnPrediction: {
      highRisk: 23,
      mediumRisk: 45,
      lowRisk: 156,
      interventionSuccess: 78
    }
  };

  // Chart Data - Statische Daten um Hydration-Fehler zu vermeiden
  const chartData = [
    { date: 'Nov 23', 'Aktive Mitglieder': 180, 'Neue Mitglieder': 5, 'Wachstum %': 0 },
    { date: 'Dez 23', 'Aktive Mitglieder': 184, 'Neue Mitglieder': 6, 'Wachstum %': 2.2 },
    { date: 'Jan 24', 'Aktive Mitglieder': 190, 'Neue Mitglieder': 8, 'Wachstum %': 5.6 },
    { date: 'Feb 24', 'Aktive Mitglieder': 194, 'Neue Mitglieder': 4, 'Wachstum %': 7.8 },
    { date: 'Mär 24', 'Aktive Mitglieder': 197, 'Neue Mitglieder': 3, 'Wachstum %': 9.4 },
    { date: 'Apr 24', 'Aktive Mitglieder': 202, 'Neue Mitglieder': 7, 'Wachstum %': 12.2 },
    { date: 'Mai 24', 'Aktive Mitglieder': 208, 'Neue Mitglieder': 9, 'Wachstum %': 15.6 },
    { date: 'Jun 24', 'Aktive Mitglieder': 213, 'Neue Mitglieder': 7, 'Wachstum %': 18.3 },
    { date: 'Jul 24', 'Aktive Mitglieder': 215, 'Neue Mitglieder': 3, 'Wachstum %': 19.4 },
    { date: 'Aug 24', 'Aktive Mitglieder': 217, 'Neue Mitglieder': 2, 'Wachstum %': 20.6 },
    { date: 'Sep 24', 'Aktive Mitglieder': 221, 'Neue Mitglieder': 5, 'Wachstum %': 22.8 },
    { date: 'Okt 24', 'Aktive Mitglieder': 227, 'Neue Mitglieder': 6, 'Wachstum %': 25.7 }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Chart-Bereich - besser positioniert und verbessert */}
      <div className="bg-slate-900/60 rounded-2xl p-8 shadow-lg border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Studio-Wachstum (12 Monate)</h3>
            <p className="text-slate-300 mt-1">Jahreswachstum: <span className="text-green-400 font-semibold">+25,7%</span></p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-violet-500 rounded-full shadow-lg shadow-violet-500/50"></div>
              <span className="text-slate-300 text-sm">Aktive Mitglieder</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-sky-400 rounded-full shadow-lg shadow-sky-400/50"></div>
              <span className="text-slate-300 text-sm">Neue Mitglieder</span>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: 450 }}>
          <ResponsiveContainer>
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="dropShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#8b5cf6" floodOpacity="0.3"/>
                </filter>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#475569" 
                opacity={0.3}
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  borderColor: '#8b5cf6',
                  color: '#f1f5f9',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
                  border: '1px solid #8b5cf6'
                }}
                labelStyle={{ color: '#f1f5f9', fontWeight: 'bold' }}
                cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Legend 
                wrapperStyle={{ color: '#f1f5f9', paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar 
                yAxisId="right" 
                dataKey="Neue Mitglieder" 
                fill="rgba(56, 189, 248, 0.7)" 
                barSize={25}
                radius={[4, 4, 0, 0]}
                filter="url(#dropShadow)"
              />
              <Line 
                yAxisId="left" 
                type="natural" 
                dataKey="Aktive Mitglieder" 
                stroke="#8b5cf6" 
                strokeWidth={4}
                dot={{ 
                  fill: '#8b5cf6', 
                  strokeWidth: 2, 
                  r: 6,
                  filter: 'url(#glow)'
                }}
                activeDot={{ 
                  r: 10, 
                  fill: '#a855f7', 
                  stroke: '#8b5cf6', 
                  strokeWidth: 3,
                  filter: 'url(#glow)',
                  style: { cursor: 'pointer' }
                }}
                connectNulls={false}
                filter="url(#glow)"
                animationDuration={2000}
                animationBegin={0}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-3xl font-bold text-green-400">+25,7%</p>
            <p className="text-slate-300 text-sm mt-1">Jahreswachstum</p>
            <p className="text-slate-500 text-xs mt-1">vs. Vorjahr</p>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-3xl font-bold text-blue-400">+{chartData[chartData.length-1]['Neue Mitglieder']}</p>
            <p className="text-slate-300 text-sm mt-1">Neue Mitglieder</p>
            <p className="text-slate-500 text-xs mt-1">Aktueller Monat</p>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-3xl font-bold text-violet-400">{chartData[chartData.length-1]['Aktive Mitglieder']}</p>
            <p className="text-slate-300 text-sm mt-1">Aktive Mitglieder</p>
            <p className="text-slate-500 text-xs mt-1">Gesamt</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700 hover:shadow-xl transition-shadow">
          <TooltipWrapper tooltipKey="members" className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm flex items-center">
                Aktive Mitglieder
              </p>
              <p className="text-3xl font-bold text-white">{analytics.activeMembers}</p>
              <p className="text-green-400 text-sm font-medium">{analytics.memberGrowth} vs. letzter Monat</p>
            </div>
            <div className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-slate-300" />
            </div>
          </TooltipWrapper>
          <div className="mt-4 text-xs text-slate-400">
            {analytics.pausedMembers} pausiert • {analytics.expiredMembers} abgelaufen
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700 hover:shadow-xl transition-shadow">
          <TooltipWrapper tooltipKey="revenue" className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm flex items-center">
                Monatsumsatz
              </p>
              <p className="text-3xl font-bold text-white">€{analytics.monthlyRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
              <p className="text-green-400 text-sm font-medium">{analytics.revenueGrowth} vs. letzter Monat</p>
            </div>
            <div className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-slate-300" />
            </div>
          </TooltipWrapper>
          <div className="mt-4 text-xs text-slate-400">
            Ziel: €20.000 (92% erreicht)
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700 hover:shadow-xl transition-shadow">
          <TooltipWrapper tooltipKey="classes" className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm flex items-center">
                Kurse diese Woche
              </p>
              <p className="text-3xl font-bold text-white">{analytics.classesThisWeek}</p>
              <p className="text-slate-300 text-sm font-medium">{analytics.avgClassAttendance} Auslastung</p>
            </div>
            <div className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-slate-300" />
            </div>
          </TooltipWrapper>
          <div className="mt-4 text-xs text-slate-400">
            Stoßzeiten: {analytics.peakHours}
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700 hover:shadow-xl transition-shadow">
          <TooltipWrapper tooltipKey="retention" className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm flex items-center">
                Kundentreue
              </p>
              <p className="text-3xl font-bold text-white">{analytics.memberRetention}</p>
              <p className="text-slate-300 text-sm font-medium">Ø {analytics.avgVisitsPerMember} Besuche/Monat</p>
            </div>
            <div className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-slate-300" />
            </div>
          </TooltipWrapper>
          <div className="mt-4 text-xs text-slate-400">
            Beliebtester Kurs: {analytics.mostPopularClass}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
          <TooltipWrapper tooltipKey="intervention" className="mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
              Churn-Risiko Management
            </h3>
          </TooltipWrapper>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-900/30 rounded-lg border border-red-800/50">
              <div>
                <p className="text-red-300 text-sm font-medium">Hohes Risiko</p>
                <p className="text-slate-300 text-xs">Keine Besuche {'>'}14 Tage</p>
              </div>
              <div className="text-red-400 font-bold text-xl">8</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-900/30 rounded-lg border border-yellow-800/50">
              <div>
                <p className="text-yellow-300 text-sm font-medium">Mittleres Risiko</p>
                <p className="text-slate-300 text-xs">Seltene Besuche {'<'}2x/Woche</p>
              </div>
              <div className="text-yellow-400 font-bold text-xl">23</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg border border-green-800/50">
              <div>
                <p className="text-green-300 text-sm font-medium">Aktive Nutzer</p>
                <p className="text-slate-300 text-xs">Regelmäßige Besuche</p>
              </div>
              <div className="text-green-400 font-bold text-xl">196</div>
            </div>
            <Link href="/leistungen/fitness-crm/demo/intervention" className="block w-full mt-4 bg-red-600/80 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors text-center">
              Interventionen starten
            </Link>
          </div>
        </div>

        {/* Store Performance - Zusatzumsätze */}
        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Store Performance
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-slate-300 text-xs">Heute</p>
                <p className="text-white font-bold text-lg">€127</p>
                <p className="text-green-400 text-xs">+23 Käufe</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-slate-300 text-xs">Monat</p>
                <p className="text-white font-bold text-lg">€1,240</p>
                <p className="text-green-400 text-xs">+18% vs Vormonat</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">🥤 Protein Shakes</span>
                <span className="text-green-400 font-medium">€45 (8 Stk)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">🏋️ Supplements</span>
                <span className="text-green-400 font-medium">€67 (3 Stk)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">👕 Merchandise</span>
                <span className="text-green-400 font-medium">€15 (1 Stk)</span>
              </div>
            </div>
            
            <div className="border-t border-slate-700 pt-3 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Ø pro Mitglied/Monat:</span>
                <span className="text-white font-medium">€5.46</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-slate-400">Konversionsrate:</span>
                <span className="text-yellow-400 font-medium">23.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schnellzugriff */}
        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Schnellzugriff
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => {setActiveTab('members'); handleNewMember();}}
              className="bg-slate-800/80 hover:bg-slate-700/80 p-3 rounded-lg text-center transition-colors"
            >
              <UserPlus className="w-6 h-6 text-slate-300 mx-auto mb-1" />
              <span className="text-slate-300 text-xs font-medium">Neues Mitglied</span>
            </button>
            <button 
              onClick={() => {setActiveTab('classes'); showDemoNotification('Neuer Kurs wird erstellt...');}}
              className="bg-slate-800/80 hover:bg-slate-700/80 p-3 rounded-lg text-center transition-colors"
            >
              <Plus className="w-6 h-6 text-slate-300 mx-auto mb-1" />
              <span className="text-slate-300 text-xs font-medium">Neuer Kurs</span>
            </button>
            <button 
              onClick={() => {setActiveTab('payments'); showDemoNotification('Zahlungsformular geöffnet');}}
              className="bg-slate-800/80 hover:bg-slate-700/80 p-3 rounded-lg text-center transition-colors"
            >
              <CreditCard className="w-6 h-6 text-slate-300 mx-auto mb-1" />
              <span className="text-slate-300 text-xs font-medium">Zahlung</span>
            </button>
            <button className="bg-slate-800/80 hover:bg-slate-700/80 p-3 rounded-lg text-center transition-colors">
              <Mail className="w-6 h-6 text-slate-300 mx-auto mb-1" />
              <span className="text-slate-300 text-xs font-medium">Newsletter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Members Render
  const renderMembers = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Mitgliederverwaltung</h2>
            <p className="text-slate-300">Verwalten Sie alle Ihre Studiomitglieder an einem Ort</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleNewMember}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Neues Mitglied
            </button>
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
          <button 
            onClick={() => showDemoNotification('Filter angewendet!')}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">VIP Mitglieder</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Premium</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
              <Users className="w-6 h-6 text-slate-300" />
            </div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Basic</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
              <Calendar className="w-6 h-6 text-slate-300" />
            </div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Inaktiv</p>
                <p className="text-2xl font-bold text-red-400">2</p>
              </div>
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Mitgliederliste */}
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
              {filteredMembers.map((member, index) => (
                <tr 
                  key={member.id} 
                  className={`border-b border-slate-700 hover:bg-slate-800/50 transition-colors`}
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
                        ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
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
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{width: `${(member.credits / 50) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-lg font-bold text-green-400">€{member.totalSpent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
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
                        onClick={() => showDemoNotification(`${member.name} wird bearbeitet...`)}
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
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
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
                  {/* Profil & Tab-Navigation */}
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
                            ? 'border-b-2 border-blue-500 text-white' 
                            : 'text-slate-400 hover:text-white'
                        }`}>
                        Übersicht
                      </button>
                      <button 
                        onClick={() => setMemberModalTab('purchaseHistory')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          memberModalTab === 'purchaseHistory' 
                            ? 'border-b-2 border-blue-500 text-white' 
                            : 'text-slate-400 hover:text-white'
                        }`}>
                        Kaufhistorie & Ausgaben
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={memberModalTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
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
                              <p className="text-2xl font-bold text-white">€{selectedMember.totalSpent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
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
                          <TooltipWrapper tooltipKey="purchaseHistory" className="mb-4">
                            <h5 className="text-lg font-semibold text-white flex items-center">
                              Kaufhistorie & Ausgabenanalyse
                            </h5>
                          </TooltipWrapper>
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
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="space-y-6">
                  {/* Aktionen */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h5 className="text-lg font-semibold text-white mb-4">Aktionen</h5>
                    <div className="space-y-3">
                      <button 
                        onClick={() => handleAddCredits(selectedMember)}
                        className="w-full flex items-center gap-3 p-3 bg-blue-900/50 hover:bg-blue-800/50 rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5 text-blue-300" />
                        <span className="text-blue-300 font-medium">Credits hinzufügen</span>
                      </button>
                      <button 
                        onClick={() => {setActiveTab('classes'); setSelectedMember(null); showDemoNotification('Kursbuchung geöffnet');}}
                        className="w-full flex items-center gap-3 p-3 bg-green-900/50 hover:bg-green-800/50 rounded-lg transition-colors"
                      >
                        <Calendar className="w-5 h-5 text-green-300" />
                        <span className="text-green-300 font-medium">Kurs buchen</span>
                      </button>
                      <button 
                        onClick={() => {setActiveTab('payments'); setSelectedMember(null); showDemoNotification('Zahlungsformular geöffnet');}}
                        className="w-full flex items-center gap-3 p-3 bg-purple-900/50 hover:bg-purple-800/50 rounded-lg transition-colors"
                      >
                        <CreditCard className="w-5 h-5 text-purple-300" />
                        <span className="text-purple-300 font-medium">Zahlung</span>
                      </button>
                    </div>
                  </div>

                  {/* Notizen */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h5 className="text-lg font-semibold text-white mb-4">Notizen</h5>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-900/30 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-yellow-200">Bevorzugt {selectedMember.preferredTime}</p>
                      </div>
                      <div className="p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-blue-200">Liebt {selectedMember.favoriteClass}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Classes Render
  const renderClasses = () => (
    <div className="space-y-6">
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Kursverwaltung</h2>
            <p className="text-slate-300">Verwalten Sie alle Ihre Fitnesskurse</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Neuer Kurs
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div key={classItem.id} className="bg-slate-800/70 rounded-xl p-6 hover:shadow-xl hover:bg-slate-700/70 transition-all border border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{classItem.name}</h3>
                  <p className="text-slate-300">{classItem.instructor}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  classItem.difficulty === 'Anfänger' ? 'bg-green-900/50 text-green-300' :
                  classItem.difficulty === 'Mittel' ? 'bg-yellow-900/50 text-yellow-300' :
                  classItem.difficulty === 'Fortgeschritten' ? 'bg-orange-900/50 text-orange-300' :
                  'bg-red-900/50 text-red-300'
                }`}>
                  {classItem.difficulty}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm text-slate-300">
                <p className="flex items-center gap-2">📅 {classItem.time}</p>
                <p className="flex items-center gap-2">💪 {classItem.category}</p>
                <p className="flex items-center gap-2">💰 €{classItem.price}</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1 text-slate-300">
                  <span>Buchungen</span>
                  <span>{classItem.booked}/{classItem.capacity}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      (classItem.booked / classItem.capacity) > 0.8 ? 'bg-red-500' :
                      (classItem.booked / classItem.capacity) > 0.6 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{width: `${(classItem.booked / classItem.capacity) * 100}%`}}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button 
                  onClick={() => setSelectedClass(classItem)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  Details
                </button>
                <button 
                  onClick={() => handleBookClass(classItem)}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                >
                  Buchen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Payments Render
  const renderPayments = () => (
    <div className="space-y-6">
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Zahlungsverwaltung</h2>
        
        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/70 p-6 rounded-xl border-l-4 border-green-500 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Monatsumsatz</p>
                <p className="text-3xl font-bold text-white">€{analytics.monthlyRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/70 p-6 rounded-xl border-l-4 border-blue-500 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Offene Rechnungen</p>
                <p className="text-3xl font-bold text-white">€2.340</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/70 p-6 rounded-xl border-l-4 border-purple-500 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Durchschnitt/Mitglied</p>
                <p className="text-3xl font-bold text-white">€97</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800/60 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Letzte Transaktionen</h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah Mueller', amount: 65, type: 'Premium Mitgliedschaft', date: '30.10.2024', status: 'Bezahlt' },
              { name: 'Michael Schmidt', amount: 150, type: 'VIP Jahresabo', date: '29.10.2024', status: 'Bezahlt' },
              { name: 'Anna Weber', amount: 65, type: 'Premium Mitgliedschaft', date: '28.10.2024', status: 'Überfällig' },
              { name: 'Thomas Bauer', amount: 45, type: 'Personal Training', date: '27.10.2024', status: 'Bezahlt' },
              { name: 'Julia Richter', amount: 35, type: 'Basic Mitgliedschaft', date: '26.10.2024', status: 'Bezahlt' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/70 rounded-lg border border-slate-600">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.name}</p>
                    <p className="text-sm text-slate-300">{transaction.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">€{transaction.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    transaction.status === 'Bezahlt' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      {/* KI-Übersicht Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">KI-basierte Kundenanalyse</h2>
            <p className="text-white/80">Intelligente Einblicke in Kaufverhalten und Verkaufsoptimierung</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">Segmente identifiziert</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">Umsatzprognose</p>
            <p className="text-2xl font-bold">+18%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">Churn Prävention</p>
            <p className="text-2xl font-bold">78%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">KI Konfidenz</p>
            <p className="text-2xl font-bold">91%</p>
          </div>
        </div>
      </div>

      {/* Kundensegmente */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">🎯 Intelligente Kundensegmentierung</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {aiAnalytics.customerSegments.map((segment, index) => (
            <div key={index} className="border border-slate-700 bg-slate-800/70 rounded-xl p-5 hover:shadow-xl hover:bg-slate-700/70 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">{segment.name}</h4>
                <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-medium">
                  {segment.count} Kunden
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-4">{segment.description}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ø Ausgaben/Monat:</span>
                  <span className="font-semibold text-white">€{segment.avgSpend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Besuchsfrequenz:</span>
                  <span className="font-semibold text-white">{segment.visitFrequency}x/Woche</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Churn-Risiko:</span>
                  <span className={`font-semibold ${segment.predictedChurn > 50 ? 'text-red-400' : segment.predictedChurn > 30 ? 'text-orange-400' : 'text-green-400'}`}>
                    {segment.predictedChurn}%
                  </span>
                </div>
                
                <div className="pt-4">
                  <p className="text-slate-400 text-sm mb-2">Bevorzugte Produkte:</p>
                  <div className="flex flex-wrap gap-1">
                    {segment.preferredProducts.map((product, i) => (
                      <span key={i} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Produktempfehlungen */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">🛍️ KI-Produktempfehlungen</h3>
        <div className="space-y-4">
          {aiAnalytics.productRecommendations.map((rec, index) => (
            <div key={index} className="border border-slate-700 bg-slate-800/70 rounded-xl p-5 hover:bg-slate-700/70 transition-colors">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3">
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <h4 className="text-lg font-semibold text-white">{rec.product}</h4>
                  <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-700">
                    {rec.confidence}% Konfidenz
                  </span>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-slate-400">Erwarteter Umsatz</p>
                  <p className="text-xl font-bold text-green-400">€{rec.expectedRevenue}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-slate-400">Zielgruppe:</p>
                  <p className="font-semibold text-white">{rec.targetSegment}</p>
                </div>
                <div>
                  <p className="text-slate-400">KI-Begründung:</p>
                  <p className="text-slate-300">{rec.reasoning}</p>
                </div>
              </div>
              
              <button 
                onClick={() => showDemoNotification(`Kampagne für ${rec.product} wird erstellt...`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Marketingkampagne starten
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Verkaufsoptimierung */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">💰 Preisoptimierung</h3>
          <div className="space-y-4">
            {Object.entries(aiAnalytics.salesOptimization.priceOptimization).map(([product, data]) => (
              <div key={product} className="border border-slate-700 bg-slate-800/70 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white capitalize">{product.replace(/([A-Z])/g, ' $1')}</h4>
                  <span className="text-green-400 font-bold">{data.expectedIncrease}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Aktuell: €{data.currentPrice}</span>
                  <span className="text-white font-semibold">Empfohlen: €{data.suggestedPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">⚠️ Churn-Prävention</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-700">
                <p className="text-2xl font-bold text-red-400">{aiAnalytics.churnPrediction.highRisk}</p>
                <p className="text-red-400 text-sm">Hohes Risiko</p>
              </div>
              <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-700">
                <p className="text-2xl font-bold text-orange-400">{aiAnalytics.churnPrediction.mediumRisk}</p>
                <p className="text-orange-400 text-sm">Mittleres Risiko</p>
              </div>
              <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-700">
                <p className="text-2xl font-bold text-green-400">{aiAnalytics.churnPrediction.lowRisk}</p>
                <p className="text-green-400 text-sm">Geringes Risiko</p>
              </div>
            </div>
            
            <div className="bg-slate-800/70 p-4 rounded-lg">
              <p className="text-slate-300 text-sm">Erfolgsquote Interventionen:</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-slate-700 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{width: `${aiAnalytics.churnPrediction.interventionSuccess}%`}}></div>
                </div>
                <span className="font-bold text-green-400">{aiAnalytics.churnPrediction.interventionSuccess}%</span>
              </div>
            </div>

            <button 
              onClick={() => showDemoNotification('Automatische Retention-Kampagne gestartet')}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Retention-Kampagne starten
            </button>
          </div>
        </div>
      </div>

      {/* Saisonale Trends */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">📈 Saisonale Verkaufstrends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(aiAnalytics.salesOptimization.seasonalTrends).map(([quarter, data]) => (
            <div key={quarter} className="text-center p-4 border border-slate-700 bg-slate-800/70 rounded-lg">
              <h4 className="font-semibold text-white mb-2">{quarter}</h4>
              <p className={`text-2xl font-bold mb-1 ${data.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {data.trend}
              </p>
              <p className="text-slate-400 text-sm">{data.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584735935634-25d54a583036?q=80&w=2874&auto=format&fit=crop')" }}
    >
      <div className="min-h-screen w-full bg-black/50 backdrop-blur-sm">
      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Member Modal */}
      <AnimatePresence>
        {showNewMemberModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewMemberModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900/80 backdrop-blur-xl border-slate-700 border rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Neues Mitglied</h3>
              <p className="text-slate-300 mb-6">Demo-Formular für neue Mitgliederregistrierung</p>
              <div className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder="E-Mail" className="w-full p-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:ring-2 focus:ring-blue-500" />
                <select className="w-full p-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white focus:ring-2 focus:ring-blue-500">
                  <option>Mitgliedschaftstyp wählen</option>
                  <option>VIP</option>
                  <option>Premium</option>
                  <option>Basic</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => {setShowNewMemberModal(false); showDemoNotification('Neues Mitglied registriert!');}}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Registrieren
                </button>
                <button 
                  onClick={() => setShowNewMemberModal(false)}
                  className="flex-1 bg-slate-700 text-slate-200 py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors px-3 py-2">
                <LogOut className="w-5 h-5" />
                <span>Demo verlassen</span>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FitnessPro CRM</h1>
                <p className="text-slate-300">Professionelles Studio Management System</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-center px-3 py-2 bg-green-900/30 rounded-lg border border-green-700">
                  <p className="text-lg font-bold text-white">{analytics.activeMembers}</p>
                  <p className="text-xs text-green-300">Aktive Mitglieder</p>
                </div>
                <div className="text-center px-3 py-2 bg-blue-900/30 rounded-lg border border-blue-700">
                  <p className="text-lg font-bold text-white">{analytics.classesThisWeek}</p>
                  <p className="text-xs text-blue-300">Kurse/Woche</p>
                </div>
                <div className="text-center px-3 py-2 bg-purple-900/30 rounded-lg border border-purple-700">
                  <p className="text-lg font-bold text-white">€{analytics.monthlyRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                  <p className="text-xs text-purple-300">Monatsumsatz</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center ml-2 shadow-lg border border-slate-600">
                <span className="text-white font-bold">ST</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto py-6">
        <div className="bg-slate-900/60 rounded-2xl shadow-lg border border-slate-700 mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 border-b-4 transition-colors min-w-fit ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-white bg-slate-800/50'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'members' && renderMembers()}
            {activeTab === 'classes' && renderClasses()}
            {activeTab === 'payments' && renderPayments()}
            {activeTab === 'analytics' && renderAnalytics()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Demo Banner */}
      <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg">
        <p className="text-sm font-medium">💪 Fitness CRM Demo</p>
        <p className="text-xs opacity-90">Vollständiges Management-System für Studiobetreiber</p>
      </div>

      </div>
    </div>
  );
}