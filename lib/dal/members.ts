/**
 * DATA ACCESS LAYER - MEMBERS
 *
 * All member data access MUST go through this layer.
 * Every function verifies authentication and authorization first.
 *
 * Security Features:
 * - Authentication check on every function
 * - Studio isolation (users only see their studio's data)
 * - DTOs (never return full database objects)
 * - Input validation
 * - SQL injection protection (via Supabase)
 */

import { createClient } from '@/lib/supabase/server';
import { verifySession } from './auth';
import { cache } from 'react';

/**
 * Member DTO (Data Transfer Object)
 * Only includes safe data for list views
 */
export type MemberListDTO = {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  status: string;
  memberNumber: string | null;
  membershipType: {
    name: string;
    color: string | null;
  } | null;
  joinedAt: string;
};

/**
 * Detailed Member DTO
 * Includes more information for detail views
 */
export type MemberDetailDTO = {
  id: string;
  memberNumber: string | null;
  status: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    dateOfBirth: string | null;
    address: any;
  };
  membership: {
    type: {
      name: string;
      priceMonthly: number | null;
      color: string | null;
      features: any;
    } | null;
    contractStartDate: string | null;
    contractEndDate: string | null;
    creditsBalance: number;
    loyaltyPoints: number;
    loyaltyTier: string | null;
  };
  health: {
    notes: string | null;
    emergencyContact: any;
  };
  meta: {
    notes: string | null;
    tags: string[];
    createdAt: string;
  };
};

/**
 * Get all members for authenticated user's studio
 *
 * Security:
 * - Verifies authentication
 * - Filters by user's studio_id automatically
 * - Returns only safe data (DTO)
 *
 * @returns Array of member DTOs
 */
export const getMembers = cache(async (): Promise<MemberListDTO[]> => {
  // 1. Verify authentication & get session
  const session = await verifySession();

  if (!session.studioId) {
    throw new Error('User has no studio assigned');
  }

  // 2. Fetch data with Supabase (protected by RLS)
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('members')
    .select(`
      id,
      member_number,
      status,
      created_at,
      membership_types (
        name,
        color
      ),
      profiles (
        first_name,
        last_name,
        phone
      )
    `)
    .eq('studio_id', session.studioId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching members:', error);
    throw new Error('Failed to fetch members');
  }

  // 3. Transform to DTO (controlled data structure)
  return (data || []).map((member) => ({
    id: member.id,
    fullName: member.profiles
      ? `${member.profiles.first_name || ''} ${member.profiles.last_name || ''}`.trim()
      : 'Unknown Member',
    email: null, // Not included in list view for performance
    phone: member.profiles?.phone || null,
    status: member.status || 'unknown',
    memberNumber: member.member_number,
    membershipType: member.membership_types
      ? {
          name: member.membership_types.name,
          color: member.membership_types.color,
        }
      : null,
    joinedAt: member.created_at,
  }));
});

/**
 * Get single member by ID
 *
 * Security:
 * - Verifies authentication
 * - Verifies member belongs to user's studio (via RLS)
 * - Returns only safe data (DTO)
 *
 * @param memberId - Member ID to fetch
 * @returns Member detail DTO
 * @throws Error if member not found or unauthorized
 */
export const getMemberById = cache(async (memberId: string): Promise<MemberDetailDTO> => {
  // 1. Verify authentication
  const session = await verifySession();

  if (!session.studioId) {
    throw new Error('User has no studio assigned');
  }

  // 2. Fetch member data
  const supabase = await createClient();

  const { data: member, error } = await supabase
    .from('members')
    .select(`
      *,
      membership_types (
        name,
        price_monthly,
        color,
        features
      ),
      profiles (
        first_name,
        last_name,
        phone,
        date_of_birth,
        address,
        emergency_contact,
        health_notes
      )
    `)
    .eq('id', memberId)
    .eq('studio_id', session.studioId) // Extra security check
    .single();

  if (error || !member) {
    throw new Error('Member not found or unauthorized');
  }

  // 3. Transform to detailed DTO
  return {
    id: member.id,
    memberNumber: member.member_number,
    status: member.status || 'unknown',
    personalInfo: {
      firstName: member.profiles?.first_name || 'Unknown',
      lastName: member.profiles?.last_name || 'Member',
      fullName: `${member.profiles?.first_name || 'Unknown'} ${member.profiles?.last_name || 'Member'}`,
      email: null, // Will be fetched separately if needed
      phone: member.profiles?.phone || null,
      dateOfBirth: member.profiles?.date_of_birth || null,
      address: member.profiles?.address || null,
    },
    membership: {
      type: member.membership_types
        ? {
            name: member.membership_types.name,
            priceMonthly: member.membership_types.price_monthly,
            color: member.membership_types.color,
            features: member.membership_types.features,
          }
        : null,
      contractStartDate: member.contract_start_date,
      contractEndDate: member.contract_end_date,
      creditsBalance: member.credits_balance || 0,
      loyaltyPoints: member.loyalty_points || 0,
      loyaltyTier: member.loyalty_tier,
    },
    health: {
      notes: member.profiles?.health_notes || null,
      emergencyContact: member.profiles?.emergency_contact || null,
    },
    meta: {
      notes: member.notes,
      tags: member.tags || [],
      createdAt: member.created_at,
    },
  };
});

/**
 * Get member count by status
 *
 * Security:
 * - Verifies authentication
 * - Filters by studio_id
 *
 * @returns Object with counts by status
 */
export const getMemberStats = cache(async () => {
  const session = await verifySession();

  if (!session.studioId) {
    throw new Error('User has no studio assigned');
  }

  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from('members')
    .select('status')
    .eq('studio_id', session.studioId);

  if (error) {
    throw new Error('Failed to fetch member stats');
  }

  const stats = {
    total: members?.length || 0,
    active: members?.filter((m) => m.status === 'active').length || 0,
    pending: members?.filter((m) => m.status === 'pending').length || 0,
    inactive: members?.filter((m) => m.status === 'inactive').length || 0,
  };

  return stats;
});

/**
 * Search members by name or email
 *
 * Security:
 * - Verifies authentication
 * - Filters by studio_id
 * - Input sanitization via Supabase
 *
 * @param query - Search query string
 * @returns Filtered member list
 */
export const searchMembers = cache(async (query: string): Promise<MemberListDTO[]> => {
  const session = await verifySession();

  if (!session.studioId) {
    throw new Error('User has no studio assigned');
  }

  // Sanitize input (Supabase handles SQL injection)
  const sanitizedQuery = query.trim().toLowerCase();

  if (!sanitizedQuery || sanitizedQuery.length < 2) {
    return [];
  }

  const supabase = await createClient();

  // Use ilike for case-insensitive search
  const { data, error } = await supabase
    .from('members')
    .select(`
      id,
      member_number,
      status,
      created_at,
      membership_types (name, color),
      profiles!inner (first_name, last_name, phone)
    `)
    .eq('studio_id', session.studioId)
    .or(`profiles.first_name.ilike.%${sanitizedQuery}%,profiles.last_name.ilike.%${sanitizedQuery}%`)
    .limit(50);

  if (error) {
    throw new Error('Failed to search members');
  }

  return (data || []).map((member) => ({
    id: member.id,
    fullName: `${member.profiles?.first_name || ''} ${member.profiles?.last_name || ''}`.trim(),
    email: null,
    phone: member.profiles?.phone || null,
    status: member.status || 'unknown',
    memberNumber: member.member_number,
    membershipType: member.membership_types
      ? {
          name: member.membership_types.name,
          color: member.membership_types.color,
        }
      : null,
    joinedAt: member.created_at,
  }));
});
