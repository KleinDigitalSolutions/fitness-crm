import { getMemberById } from '@/lib/dal';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Activity,
  Edit,
  Trash2,
  Heart,
  Target,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Use Data Access Layer - auto-authenticated & secured!
  let member;
  try {
    member = await getMemberById(id);
  } catch (error) {
    console.error('Failed to fetch member:', error);
    notFound();
  }

  const fullName = member.personalInfo.fullName;
  const initials = `${member.personalInfo.firstName[0]}${member.personalInfo.lastName[0]}`;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/dashboard/members"
        className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Members
      </Link>

      {/* Header Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-3xl font-bold text-white">
              {initials}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold text-white">{fullName}</h1>
              <p className="mt-2 text-white/60">Member #{member.memberNumber || 'N/A'}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                {/* Status Badge */}
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
                    member.status === 'active'
                      ? 'bg-green-500/10 text-green-400'
                      : member.status === 'pending'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-slate-500/10 text-slate-400'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-current"></span>
                  {member.status}
                </span>

                {/* Membership Type */}
                {member.membership.type && (
                  <span
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white"
                    style={{
                      backgroundColor: member.membership.type.color
                        ? `${member.membership.type.color}20`
                        : undefined,
                    }}
                  >
                    {member.membership.type.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-colors hover:bg-white/10">
              <Edit className="h-5 w-5" />
            </button>
            <button className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition-colors hover:bg-red-500/20">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="space-y-8 lg:col-span-2">
          {/* Contact Information */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-6 text-xl font-bold text-white">Contact Information</h2>
            <div className="space-y-4">
              {member.personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Phone</p>
                    <p className="text-white">{member.personalInfo.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Email</p>
                  <p className="text-white">member@example.com</p>
                </div>
              </div>

              {member.profiles?.date_of_birth && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <Calendar className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Date of Birth</p>
                    <p className="text-white">
                      {new Date(member.profiles.date_of_birth).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
              )}

              {member.profiles?.address && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <MapPin className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Address</p>
                    <p className="text-white">{JSON.stringify(member.profiles.address)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Membership Details */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-6 text-xl font-bold text-white">Membership Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-white/50">Contract Start</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {member.contract_start_date
                    ? new Date(member.contract_start_date).toLocaleDateString('de-DE')
                    : 'Not set'}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-white/50">Contract End</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {member.contract_end_date
                    ? new Date(member.contract_end_date).toLocaleDateString('de-DE')
                    : 'Unlimited'}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-white/50">Credits Balance</p>
                <p className="mt-1 text-lg font-semibold text-white">{member.credits_balance || 0}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-white/50">Loyalty Points</p>
                <p className="mt-1 text-lg font-semibold text-white">{member.loyalty_points || 0}</p>
              </div>
            </div>

            {member.membership_types && (
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">Monthly Fee</p>
                    <p className="mt-1 text-2xl font-bold text-white">
                      €{member.membership_types.price_monthly?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                    <CreditCard className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Health Notes */}
          {member.profiles?.health_notes && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">Health Notes</h2>
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                <p className="text-sm text-white/80">{member.profiles.health_notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-6 text-xl font-bold text-white">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Activity className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-sm text-white/70">Check-ins</span>
                </div>
                <span className="text-lg font-bold text-white">24</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <Target className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-sm text-white/70">Classes Attended</span>
                </div>
                <span className="text-lg font-bold text-white">18</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                    <Heart className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-sm text-white/70">Avg. Weekly Visits</span>
                </div>
                <span className="text-lg font-bold text-white">3.5</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <TrendingUp className="h-5 w-5 text-orange-400" />
                  </div>
                  <span className="text-sm text-white/70">Member Since</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {new Date(member.created_at).toLocaleDateString('de-DE', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {member.tags && member.tags.length > 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {member.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {member.notes && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">Notes</h2>
              <p className="text-sm leading-relaxed text-white/70">{member.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
