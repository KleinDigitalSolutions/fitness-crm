// components/dashboard/Sidebar.tsx

import React from 'react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-2"><a href="/dashboard/members" className="hover:text-gray-300">Members</a></li>
          <li className="mb-2"><a href="/dashboard/classes" className="hover:text-gray-300">Classes</a></li>
          <li className="mb-2"><a href="/dashboard/payments" className="hover:text-gray-300">Payments</a></li>
          <li className="mb-2"><a href="/dashboard/analytics" className="hover:text-gray-300">Analytics</a></li>
          <li className="mb-2"><a href="/dashboard/settings" className="hover:text-gray-300">Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
}
