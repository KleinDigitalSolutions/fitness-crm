// components/dashboard/Header.tsx
'use client';

import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-slate-900/30 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-8">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search members, classes..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative rounded-xl p-2 text-white/70 transition-colors hover:bg-white/5 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
              <User className="h-4 w-4 text-red-400" />
            </div>
            <span className="text-sm font-medium text-white">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
