// app/dashboard/layout.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Settings,
  Bell,
  HelpCircle
} from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showNotification, setShowNotification] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/dashboard' },
    { id: 'members', label: 'Mitglieder', icon: Users, href: '/dashboard/members' },
    { id: 'classes', label: 'Kurse', icon: Calendar, href: '/dashboard/classes' },
    { id: 'payments', label: 'Zahlungen', icon: CreditCard, href: '/dashboard/payments' },
    { id: 'analytics', label: 'KI Analytics', icon: TrendingUp, href: '/dashboard/analytics' }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900/80 backdrop-blur-xl border-r border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            Fitness CRM
          </h1>
          <p className="text-slate-400 text-sm mt-2">Studio Management System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href ||
                           (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 space-y-3">
          <LogoutButton />

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Einstellungen</span>
          </Link>

          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">Benötigen Sie Hilfe?</p>
                <p className="text-xs text-slate-400 mt-1">Unser Support-Team ist für Sie da</p>
                <button className="text-xs text-red-400 hover:text-red-300 mt-2 font-medium">
                  Support kontaktieren →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-700 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {navItems.find(item => pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href)))?.label || 'Dashboard'}
              </h2>
              <p className="text-slate-400 text-sm mt-1">Willkommen zurück im Studio-Dashboard</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNotification(!showNotification)}
                className="relative p-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-all"
              >
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <span className="text-white text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-slate-950/30">
          {children}
        </main>
      </div>
    </div>
  );
}
