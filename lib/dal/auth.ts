/**
 * DATA ACCESS LAYER - AUTHENTICATION
 *
 * This module handles all authentication and session verification.
 * All protected data access MUST use verifySession() first.
 *
 * Security Features:
 * - Session verification with caching
 * - Automatic redirect on failure
 * - Type-safe session data
 * - No sensitive data exposure
 */

import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';
import { redirect } from 'next/navigation';

/**
 * Session DTO (Data Transfer Object)
 * Only returns safe, necessary data - never full user object
 */
export type SessionData = {
  userId: string;
  email: string;
  role?: string;
  studioId?: string;
};

/**
 * Verify user session and return safe session data
 *
 * This function:
 * 1. Checks if user has valid Supabase session
 * 2. Fetches user profile from database
 * 3. Returns only necessary data (DTO pattern)
 * 4. Redirects to login if unauthorized
 * 5. Uses React cache for performance
 *
 * @throws Redirects to /login if session invalid
 * @returns Safe session data (DTO)
 *
 * Usage:
 * ```typescript
 * const session = await verifySession();
 * // Now you have authenticated user data
 * ```
 */
export const verifySession = cache(async (): Promise<SessionData> => {
  const supabase = await createClient();

  // Check Supabase Auth session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    redirect('/login');
  }

  // Fetch user profile with studio relationship
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role, studio_id')
    .eq('user_id', session.user.id)
    .single();

  if (profileError || !profile) {
    // User authenticated but no profile - should not happen
    console.error('Profile not found for authenticated user:', session.user.id);
    redirect('/login');
  }

  // Return DTO - only safe, necessary data
  return {
    userId: session.user.id,
    email: session.user.email || '',
    role: profile.role || undefined,
    studioId: profile.studio_id || undefined,
  };
});

/**
 * Verify session and check for specific role
 *
 * @param allowedRoles - Array of allowed roles
 * @throws Redirects to /login if unauthorized
 * @throws Redirects to /dashboard if insufficient permissions
 *
 * Usage:
 * ```typescript
 * await requireRole(['studio_admin', 'trainer']);
 * ```
 */
export const requireRole = cache(async (allowedRoles: string[]): Promise<SessionData> => {
  const session = await verifySession();

  if (!session.role || !allowedRoles.includes(session.role)) {
    // Authenticated but not authorized
    redirect('/dashboard?error=insufficient_permissions');
  }

  return session;
});

/**
 * Verify session and check studio ownership
 *
 * @param studioId - Studio ID to verify ownership
 * @throws Redirects if user doesn't own/belong to studio
 *
 * Usage:
 * ```typescript
 * await requireStudioAccess('studio-uuid-here');
 * ```
 */
export const requireStudioAccess = cache(async (studioId: string): Promise<SessionData> => {
  const session = await verifySession();

  if (session.studioId !== studioId) {
    // User trying to access different studio's data
    redirect('/dashboard?error=unauthorized_studio_access');
  }

  return session;
});

/**
 * Get current session without redirect (for optional auth)
 * Returns null if no session
 *
 * Usage:
 * ```typescript
 * const session = await getSession();
 * if (session) {
 *   // User is logged in
 * }
 * ```
 */
export const getSession = cache(async (): Promise<SessionData | null> => {
  const supabase = await createClient();

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, studio_id')
    .eq('user_id', session.user.id)
    .single();

  if (!profile) {
    return null;
  }

  return {
    userId: session.user.id,
    email: session.user.email || '',
    role: profile.role || undefined,
    studioId: profile.studio_id || undefined,
  };
});
