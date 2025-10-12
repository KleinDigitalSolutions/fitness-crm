import { createClient } from '@/lib/supabase/server';
import { Users, DollarSign, Calendar } from 'lucide-react';
import { MemberGrowthChart } from '@/components/dashboard/MemberGrowthChart';

export default async function DashboardPage() {
  const supabase = createClient();
  const { count: memberCount } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true });

  const { count: activeMemberCount } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { data: revenueData } = await supabase
    .from('payments')
    .select('amount')
    .gte('payment_date', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
    .lte('payment_date', new Date().toISOString());

  const monthlyRevenue = revenueData?.reduce((acc, p) => acc + p.amount, 0) ?? 0;

  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

  const { count: classesThisWeek } = await supabase
    .from('class_schedules')
    .select('*', { count: 'exact', head: true })
    .gte('start_time', startOfWeek.toISOString())
    .lte('start_time', endOfWeek.toISOString());

  const { data: memberDates } = await supabase
    .from('members')
    .select('created_at');

  const memberGrowthData = memberDates?.reduce((acc, member) => {
    const month = new Date(member.created_at).toLocaleString('default', { month: 'short', year: '2-digit' });
    const existingMonth = acc.find(item => item.date === month);
    if (existingMonth) {
      existingMonth.count++;
    } else {
      acc.push({ date: month, count: 1 });
    }
    return acc;
  }, [] as { date: string; count: number }[]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <p className="text-3xl font-bold text-gray-900">{memberCount ?? '0'}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <p className="text-3xl font-bold text-gray-900">{activeMemberCount ?? '0'}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">€{monthlyRevenue}</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Classes This Week</p>
              <p className="text-3xl font-bold text-gray-900">{classesThisWeek ?? '0'}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
      <MemberGrowthChart data={memberGrowthData ?? []} />
    </div>
