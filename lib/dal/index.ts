/**
 * DATA ACCESS LAYER - MAIN EXPORT
 *
 * This is the single entry point for all data access in the application.
 * All database queries MUST go through this layer.
 *
 * WHY DATA ACCESS LAYER?
 * ========================
 *
 * 1. SECURITY: Authentication & authorization in one place
 * 2. CONSISTENCY: All data access follows same patterns
 * 3. TESTABILITY: Easy to mock for testing
 * 4. MAINTAINABILITY: Changes in one place
 * 5. PERFORMANCE: Built-in caching with React cache()
 * 6. DATA CONTROL: DTOs prevent over-fetching
 *
 * USAGE:
 * ======
 *
 * ```typescript
 * // In a Server Component
 * import { getMembers } from '@/lib/dal';
 *
 * export default async function MembersPage() {
 *   const members = await getMembers(); // Auto-authenticated!
 *   return <MembersList members={members} />;
 * }
 * ```
 *
 * ```typescript
 * // In a Server Action
 * 'use server'
 * import { createMember } from '@/lib/dal';
 *
 * export async function createMemberAction(formData: FormData) {
 *   const member = await createMember({...}); // Auto-authenticated!
 *   revalidatePath('/dashboard/members');
 *   return member;
 * }
 * ```
 *
 * SECURITY GUARANTEES:
 * ====================
 *
 * ✅ Every function verifies authentication first
 * ✅ Users can only access their studio's data
 * ✅ DTOs prevent sensitive data exposure
 * ✅ Input validation on all mutations
 * ✅ SQL injection protection via Supabase
 * ✅ XSS protection via input sanitization
 * ✅ CSRF protection via Server Actions
 * ✅ Rate limiting via Supabase Auth
 *
 * DO NOT:
 * =======
 *
 * ❌ Call createClient() directly in components
 * ❌ Bypass DAL for "quick" queries
 * ❌ Return full database objects
 * ❌ Skip authentication checks
 * ❌ Trust client-side input without validation
 *
 * ALWAYS:
 * =======
 *
 * ✅ Use DAL functions
 * ✅ Validate input in Server Actions
 * ✅ Return DTOs, not raw database objects
 * ✅ Handle errors gracefully
 * ✅ Log security violations
 */

// ============================================================================
// AUTHENTICATION & SESSION
// ============================================================================

export {
  verifySession,
  requireRole,
  requireStudioAccess,
  getSession,
  type SessionData,
} from './auth';

// ============================================================================
// MEMBERS
// ============================================================================

export {
  getMembers,
  getMemberById,
  getMemberStats,
  searchMembers,
  type MemberListDTO,
  type MemberDetailDTO,
} from './members';

// ============================================================================
// FUTURE MODULES
// ============================================================================

// export { getStudioById, updateStudio } from './studios';
// export { getPayments, createPayment } from './payments';
// export { getClasses, createClass } from './classes';
// export { getMembershipTypes } from './membership-types';
