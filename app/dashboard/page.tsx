import { createClient } from '@/lib/supabase/server';
import { Users, TrendingUp, Calendar, Activity } from 'lucide-react';
import { MemberGrowthChart } from '@/components/dashboard/MemberGrowthChart';

export default async function DashboardPage() {
  const supabase = await createClient();
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-white/60">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Members */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Total Members</p>
              <p className="mt-2 text-3xl font-bold text-white">{memberCount ?? '0'}</p>
              <p className="mt-1 text-sm text-green-400">+12 this week</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
              <Users className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </div>

        {/* Active Members */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Active Members</p>
              <p className="mt-2 text-3xl font-bold text-white">{activeMemberCount ?? '0'}</p>
              <p className="mt-1 text-sm text-white/60">94.2% retention</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <Activity className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Monthly Revenue</p>
              <p className="mt-2 text-3xl font-bold text-white">€{monthlyRevenue.toLocaleString()}</p>
              <p className="mt-1 text-sm text-green-400">+18% vs last month</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Classes This Week */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Classes This Week</p>
              <p className="mt-2 text-3xl font-bold text-white">{classesThisWeek ?? '0'}</p>
              <p className="mt-1 text-sm text-white/60">85% avg. attendance</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
              <Calendar className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <MemberGrowthChart data={memberGrowthData ?? []} />
    </div>
  );
}
