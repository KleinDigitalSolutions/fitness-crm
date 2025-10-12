'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, CreditCard, FileText, Tag } from 'lucide-react';
import Link from 'next/link';

export default function NewMemberPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission with Supabase
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard/members');
    }, 1000);
  };

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

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Add New Member</h1>
        <p className="mt-2 text-white/60">Create a new member profile and set up their membership</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
              <User className="h-5 w-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-white/70">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-white/70">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                Email Address *
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/70">
                Phone Number
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Phone className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="+49 123 456789"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-medium text-white/70">
                Date of Birth
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Calendar className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            {/* Member Number */}
            <div>
              <label htmlFor="memberNumber" className="mb-2 block text-sm font-medium text-white/70">
                Member Number
              </label>
              <input
                type="text"
                id="memberNumber"
                name="memberNumber"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Auto-generated if empty"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="mb-2 block text-sm font-medium text-white/70">
                Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-3 left-0 flex pl-4">
                  <MapPin className="h-5 w-5 text-white/40" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="Street, City, ZIP"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Membership Details */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
              <CreditCard className="h-5 w-5 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Membership Details</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Membership Type */}
            <div>
              <label htmlFor="membershipType" className="mb-2 block text-sm font-medium text-white/70">
                Membership Type *
              </label>
              <select
                id="membershipType"
                name="membershipType"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="" className="bg-slate-900">Select a membership type</option>
                <option value="basic" className="bg-slate-900">Basic - €29.99/month</option>
                <option value="premium" className="bg-slate-900">Premium - €49.99/month</option>
                <option value="elite" className="bg-slate-900">Elite - €79.99/month</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="mb-2 block text-sm font-medium text-white/70">
                Status *
              </label>
              <select
                id="status"
                name="status"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="pending" className="bg-slate-900">Pending</option>
                <option value="active" className="bg-slate-900">Active</option>
                <option value="inactive" className="bg-slate-900">Inactive</option>
              </select>
            </div>

            {/* Contract Start Date */}
            <div>
              <label htmlFor="contractStartDate" className="mb-2 block text-sm font-medium text-white/70">
                Contract Start Date *
              </label>
              <input
                type="date"
                id="contractStartDate"
                name="contractStartDate"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Contract End Date */}
            <div>
              <label htmlFor="contractEndDate" className="mb-2 block text-sm font-medium text-white/70">
                Contract End Date
              </label>
              <input
                type="date"
                id="contractEndDate"
                name="contractEndDate"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label htmlFor="paymentMethod" className="mb-2 block text-sm font-medium text-white/70">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="" className="bg-slate-900">Select payment method</option>
                <option value="sepa" className="bg-slate-900">SEPA Direct Debit</option>
                <option value="card" className="bg-slate-900">Credit/Debit Card</option>
                <option value="cash" className="bg-slate-900">Cash</option>
                <option value="bank_transfer" className="bg-slate-900">Bank Transfer</option>
              </select>
            </div>

            {/* SEPA Mandate ID */}
            <div>
              <label htmlFor="sepaMandateId" className="mb-2 block text-sm font-medium text-white/70">
                SEPA Mandate ID
              </label>
              <input
                type="text"
                id="sepaMandateId"
                name="sepaMandateId"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Optional"
              />
            </div>

            {/* Credits Balance */}
            <div>
              <label htmlFor="creditsBalance" className="mb-2 block text-sm font-medium text-white/70">
                Initial Credits Balance
              </label>
              <input
                type="number"
                id="creditsBalance"
                name="creditsBalance"
                min="0"
                defaultValue="0"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Loyalty Points */}
            <div>
              <label htmlFor="loyaltyPoints" className="mb-2 block text-sm font-medium text-white/70">
                Initial Loyalty Points
              </label>
              <input
                type="number"
                id="loyaltyPoints"
                name="loyaltyPoints"
                min="0"
                defaultValue="0"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Additional Information</h2>
          </div>

          <div className="space-y-6">
            {/* Emergency Contact */}
            <div>
              <label htmlFor="emergencyContact" className="mb-2 block text-sm font-medium text-white/70">
                Emergency Contact
              </label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Name and phone number"
              />
            </div>

            {/* Health Notes */}
            <div>
              <label htmlFor="healthNotes" className="mb-2 block text-sm font-medium text-white/70">
                Health Notes
              </label>
              <textarea
                id="healthNotes"
                name="healthNotes"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Any medical conditions, allergies, or health concerns..."
              />
            </div>

            {/* General Notes */}
            <div>
              <label htmlFor="notes" className="mb-2 block text-sm font-medium text-white/70">
                General Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Additional notes about this member..."
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-medium text-white/70">
                Tags
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Tag className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder-white/40 transition-all focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="VIP, Student, Corporate (comma-separated)"
                />
              </div>
              <p className="mt-1 text-xs text-white/50">Separate multiple tags with commas</p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/dashboard/members"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-red-500 px-8 py-3 font-semibold text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Member...' : 'Create Member'}
          </button>
        </div>
      </form>
    </div>
  );
}
