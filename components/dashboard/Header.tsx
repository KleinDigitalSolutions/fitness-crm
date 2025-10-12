// components/dashboard/Header.tsx

import React from 'react';

export function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <div>
        {/* User profile or notifications can go here */}
        <span className="text-gray-600">Welcome, User!</span>
      </div>
    </header>
  );
}
