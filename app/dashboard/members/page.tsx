import { getMembers, getMemberStats } from '@/lib/dal';
import { Users, Search, Filter, UserPlus, MoreVertical, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

export default async function MembersPage() {
  // Use Data Access Layer - auto-authenticated & secured!
  const [members, stats] = await Promise.all([
    getMembers(),
    getMemberStats(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Members</h1>
          <p className="mt-2 text-white/60">Manage your studio members and their memberships</p>
        </div>
        <Link
          href="/dashboard/members/new"
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600"
        >
          <UserPlus className="h-5 w-5" />
          Add Member
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Total Members</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Active</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.active}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <Users className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Pending</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.pending}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
              <Users className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Inactive</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.inactive}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-500/10">
              <Users className="h-6 w-6 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search members..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors hover:bg-white/10">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      {/* Members List */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
        {members && members.length > 0 ? (
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-white/10 px-6 py-4">
              <div className="col-span-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                Member
              </div>
              <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Membership
              </div>
              <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Status
              </div>
              <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Joined
              </div>
              <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Actions
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/10">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 transition-colors hover:bg-white/5"
                >
                  {/* Member Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-sm font-bold text-white">
                      {member.fullName[0]?.toUpperCase() || 'M'}
                      {member.fullName.split(' ')[1]?.[0]?.toUpperCase() || 'M'}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {member.fullName}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
                        {member.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {member.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Membership Type */}
                  <div className="col-span-2 flex items-center">
                    <span
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white"
                      style={{
                        backgroundColor: member.membershipType?.color
                          ? `${member.membershipType.color}20`
                          : undefined,
                      }}
                    >
                      {member.membershipType?.name || 'No Plan'}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        member.status === 'active'
                          ? 'bg-green-500/10 text-green-400'
                          : member.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-slate-500/10 text-slate-400'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                      {member.status}
                    </span>
                  </div>

                  {/* Joined Date */}
                  <div className="col-span-2 flex items-center">
                    <span className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="h-4 w-4" />
                      {new Date(member.joinedAt).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/members/${member.id}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                    >
                      View
                    </Link>
                    <button className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white transition-colors hover:bg-white/10">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
              <Users className="h-10 w-10 text-white/40" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">No members yet</h3>
            <p className="mb-6 text-white/60">Get started by adding your first member</p>
            <Link
              href="/dashboard/members/new"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600"
            >
              <UserPlus className="h-5 w-5" />
              Add Your First Member
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
