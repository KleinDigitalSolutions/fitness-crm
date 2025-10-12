'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MemberGrowthChartProps {
  data: { date: string; count: number }[];
}

export function MemberGrowthChart({ data }: MemberGrowthChartProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Member Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" name="New Members" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
