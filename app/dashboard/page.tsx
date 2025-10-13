'use client'

import { useState, useEffect } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Users,
  TrendingUp,
  Calendar,
  Activity,
  Euro,
  Clock,
  Target,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState({
    totalMembers: 247,
    activeMembers: 227,
    pausedMembers: 12,
    expiredMembers: 8,
    monthlyRevenue: 18420,
    classesThisWeek: 35,
    memberGrowth: '+12.5%',
    revenueGrowth: '+8.3%',
    avgClassAttendance: '78%',
    memberRetention: '92%'
  });

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        activeMembers: prev.activeMembers + Math.floor(Math.random() * 3) - 1,
        monthlyRevenue: prev.monthlyRevenue + Math.floor(Math.random() * 100) - 40,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const kpiCards = [
    {
      title: 'Aktive Mitglieder',
      value: analytics.activeMembers,
      change: analytics.memberGrowth,
      icon: Users,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30'
    },
    {
      title: 'Monatsumsatz',
      value: `€${analytics.monthlyRevenue.toLocaleString()}`,
      change: analytics.revenueGrowth,
      icon: Euro,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30'
    },
    {
      title: 'Kurse diese Woche',
      value: analytics.classesThisWeek,
      change: '+5 vs. letzte Woche',
      icon: Calendar,
      color: 'from-sky-500 to-blue-500',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30'
    },
    {
      title: 'Ø Anwesenheit',
      value: analytics.avgClassAttendance,
      change: '+3% vs. Vormonat',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    }
  ];

  const quickStats = [
    {
      label: 'Pausiert',
      value: analytics.pausedMembers,
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      label: 'Retention Rate',
      value: analytics.memberRetention,
      icon: Target,
      color: 'text-green-400'
    },
    {
      label: 'Abgelaufen',
      value: analytics.expiredMembers,
      icon: Zap,
      color: 'text-red-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`
                bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6
                border ${card.borderColor}
                shadow-lg hover:shadow-xl transition-all duration-300
                hover:scale-105 hover:-translate-y-1
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`
                  w-12 h-12 rounded-xl ${card.bgColor}
                  flex items-center justify-center
                `}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold bg-green-500/10 px-2 py-1 rounded-lg">
                  {card.change}
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">{card.title}</p>
                <p className="text-white text-3xl font-bold mt-2">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-900/40 backdrop-blur-xl rounded-xl p-4 border border-slate-700 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-slate-300 text-sm font-medium">{stat.label}</span>
              </div>
              <span className="text-white text-xl font-bold">{stat.value}</span>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Studio-Wachstum (12 Monate)</h3>
            <p className="text-slate-300 mt-1">
              Jahreswachstum: <span className="text-green-400 font-semibold">+25,7%</span>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
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
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
              />
              <YAxis
                yAxisId="left"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
                label={{ value: 'Mitglieder', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
                label={{ value: 'Wachstum %', angle: 90, position: 'insideRight', fill: '#94a3b8' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar
                yAxisId="left"
                dataKey="Neue Mitglieder"
                fill="#38bdf8"
                radius={[8, 8, 0, 0]}
                opacity={0.8}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Aktive Mitglieder"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Wachstum %"
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#22c55e', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Letzte Aktivitäten</h3>
          <div className="space-y-3">
            {[
              { action: 'Neue Anmeldung', user: 'Sarah Mueller', time: 'vor 5 Min', type: 'success' },
              { action: 'Kurs gebucht', user: 'Max Weber', time: 'vor 12 Min', type: 'info' },
              { action: 'Zahlung eingegangen', user: 'Lisa Schmidt', time: 'vor 25 Min', type: 'success' },
              { action: 'Mitgliedschaft pausiert', user: 'Tom Klein', time: 'vor 1 Std', type: 'warning' }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-2 h-2 rounded-full
                    ${activity.type === 'success' ? 'bg-green-400' : ''}
                    ${activity.type === 'info' ? 'bg-blue-400' : ''}
                    ${activity.type === 'warning' ? 'bg-yellow-400' : ''}
                  `}></div>
                  <div>
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-slate-400 text-xs">{activity.user}</p>
                  </div>
                </div>
                <span className="text-slate-500 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Kommende Kurse</h3>
          <div className="space-y-3">
            {[
              { name: 'Yoga Flow', time: '18:00', instructor: 'Anna Berg', spots: '12/15' },
              { name: 'HIIT Training', time: '19:00', instructor: 'Mike Fischer', spots: '20/20' },
              { name: 'Pilates', time: '20:00', instructor: 'Julia Roth', spots: '8/12' }
            ].map((classItem, index) => (
              <div
                key={index}
                className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-red-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{classItem.name}</h4>
                  <span className="text-red-400 text-sm font-medium">{classItem.time}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{classItem.instructor}</span>
                  <span className="text-slate-300">{classItem.spots} Plätze</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
