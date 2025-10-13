/**
 * MEMBER SERVER ACTIONS
 *
 * All member mutations (create, update, delete) go through these Server Actions.
 *
 * Security Features:
 * - Input validation with Zod
 * - Authentication via DAL
 * - CSRF protection (built-in to Server Actions)
 * - Studio isolation
 * - Error handling
 */

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { verifySession } from '@/lib/dal';
import {
  createMemberSchema,
  updateMemberSchema,
  memberIdSchema,
  type CreateMemberInput,
  type UpdateMemberInput,
} from '@/lib/validations/member';

/**
 * Action result type for consistent error handling
 */
type ActionResult<T = void> = {
  success: boolean;
  error?: string;
  data?: T;
};

/**
 * CREATE MEMBER
 *
 * Creates a new member with validation
 *
 * @param input - Member data (unvalidated)
 * @returns Action result with member ID or error
 */
export async function createMember(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    // 1. Verify authentication
    const session = await verifySession();

    if (!session.studioId) {
      return { success: false, error: 'No studio assigned to user' };
    }

    // 2. Validate input
    const validated = createMemberSchema.safeParse(input);

    if (!validated.success) {
      const firstError = validated.error.errors[0];
      return {
        success: false,
        error: `${firstError.path.join('.')}: ${firstError.message}`,
      };
    }

    const data = validated.data;

    // 3. Create Supabase client
    const supabase = await createClient();

    // 4. Start transaction: Create profile first
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: session.userId, // Link to auth user who created this
        studio_id: session.studioId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone || null,
        date_of_birth: data.dateOfBirth || null,
        address: data.address || null,
        emergency_contact: data.emergencyContact || null,
        health_notes: data.healthNotes || null,
      })
      .select('id')
      .single();

    if (profileError || !profile) {
      console.error('Failed to create profile:', profileError);
      return { success: false, error: 'Failed to create member profile' };
    }

    // 5. Create member record
    const { data: member, error: memberError } = await supabase
      .from('members')
      .insert({
        profile_id: profile.id,
        studio_id: session.studioId,
        membership_type_id: data.membershipTypeId || null,
        member_number: data.memberNumber || null,
        status: data.status,
        contract_start_date: data.contractStartDate || null,
        contract_end_date: data.contractEndDate || null,
        notes: data.notes || null,
        tags: data.tags || [],
      })
      .select('id')
      .single();

    if (memberError || !member) {
      // Rollback: Delete profile
      await supabase.from('profiles').delete().eq('id', profile.id);
      console.error('Failed to create member:', memberError);
      return { success: false, error: 'Failed to create member' };
    }

    // 6. Revalidate members page
    revalidatePath('/dashboard/members');

    // 7. Return success
    return {
      success: true,
      data: { id: member.id },
    };
  } catch (error) {
    console.error('Create member error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * UPDATE MEMBER
 *
 * Updates an existing member with validation
 *
 * @param id - Member ID
 * @param input - Updated member data (unvalidated)
 * @returns Action result
 */
export async function updateMember(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    // 1. Verify authentication
    const session = await verifySession();

    if (!session.studioId) {
      return { success: false, error: 'No studio assigned to user' };
    }

    // 2. Validate ID
    const idValidation = memberIdSchema.safeParse({ id });
    if (!idValidation.success) {
      return { success: false, error: 'Invalid member ID' };
    }

    // 3. Validate input
    const validated = updateMemberSchema.safeParse(input);

    if (!validated.success) {
      const firstError = validated.error.errors[0];
      return {
        success: false,
        error: `${firstError.path.join('.')}: ${firstError.message}`,
      };
    }

    const data = validated.data;

    // 4. Create Supabase client
    const supabase = await createClient();

    // 5. Verify member belongs to user's studio
    const { data: existingMember, error: fetchError } = await supabase
      .from('members')
      .select('profile_id')
      .eq('id', id)
      .eq('studio_id', session.studioId)
      .single();

    if (fetchError || !existingMember) {
      return { success: false, error: 'Member not found or unauthorized' };
    }

    // 6. Update profile if personal data changed
    if (
      data.firstName ||
      data.lastName ||
      data.phone ||
      data.dateOfBirth ||
      data.address ||
      data.emergencyContact ||
      data.healthNotes
    ) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          ...(data.firstName && { first_name: data.firstName }),
          ...(data.lastName && { last_name: data.lastName }),
          ...(data.phone !== undefined && { phone: data.phone || null }),
          ...(data.dateOfBirth !== undefined && { date_of_birth: data.dateOfBirth || null }),
          ...(data.address !== undefined && { address: data.address || null }),
          ...(data.emergencyContact !== undefined && {
            emergency_contact: data.emergencyContact || null,
          }),
          ...(data.healthNotes !== undefined && { health_notes: data.healthNotes || null }),
        })
        .eq('id', existingMember.profile_id);

      if (profileError) {
        console.error('Failed to update profile:', profileError);
        return { success: false, error: 'Failed to update member profile' };
      }
    }

    // 7. Update member record
    const { error: memberError } = await supabase
      .from('members')
      .update({
        ...(data.membershipTypeId !== undefined && {
          membership_type_id: data.membershipTypeId || null,
        }),
        ...(data.memberNumber !== undefined && { member_number: data.memberNumber || null }),
        ...(data.status && { status: data.status }),
        ...(data.contractStartDate !== undefined && {
          contract_start_date: data.contractStartDate || null,
        }),
        ...(data.contractEndDate !== undefined && {
          contract_end_date: data.contractEndDate || null,
        }),
        ...(data.creditsBalance !== undefined && { credits_balance: data.creditsBalance }),
        ...(data.loyaltyPoints !== undefined && { loyalty_points: data.loyaltyPoints }),
        ...(data.loyaltyTier !== undefined && { loyalty_tier: data.loyaltyTier || null }),
        ...(data.notes !== undefined && { notes: data.notes || null }),
        ...(data.tags !== undefined && { tags: data.tags || [] }),
      })
      .eq('id', id);

    if (memberError) {
      console.error('Failed to update member:', memberError);
      return { success: false, error: 'Failed to update member' };
    }

    // 8. Revalidate
    revalidatePath('/dashboard/members');
    revalidatePath(`/dashboard/members/${id}`);

    // 9. Return success
    return { success: true };
  } catch (error) {
    console.error('Update member error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * DELETE MEMBER
 *
 * Soft deletes a member (sets status to inactive)
 *
 * @param id - Member ID
 * @returns Action result
 */
export async function deleteMember(id: string): Promise<ActionResult> {
  try {
    // 1. Verify authentication
    const session = await verifySession();

    if (!session.studioId) {
      return { success: false, error: 'No studio assigned to user' };
    }

    // 2. Validate ID
    const idValidation = memberIdSchema.safeParse({ id });
    if (!idValidation.success) {
      return { success: false, error: 'Invalid member ID' };
    }

    // 3. Create Supabase client
    const supabase = await createClient();

    // 4. Soft delete: Set status to inactive
    const { error } = await supabase
      .from('members')
      .update({ status: 'inactive' })
      .eq('id', id)
      .eq('studio_id', session.studioId);

    if (error) {
      console.error('Failed to delete member:', error);
      return { success: false, error: 'Failed to delete member' };
    }

    // 5. Revalidate
    revalidatePath('/dashboard/members');

    // 6. Redirect to members list
    redirect('/dashboard/members');
  } catch (error) {
    if ((error as Error).message?.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw redirect
    }
    console.error('Delete member error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * RESTORE MEMBER
 *
 * Restores a soft-deleted member
 *
 * @param id - Member ID
 * @returns Action result
 */
export async function restoreMember(id: string): Promise<ActionResult> {
  try {
    // 1. Verify authentication
    const session = await verifySession();

    if (!session.studioId) {
      return { success: false, error: 'No studio assigned to user' };
    }

    // 2. Validate ID
    const idValidation = memberIdSchema.safeParse({ id });
    if (!idValidation.success) {
      return { success: false, error: 'Invalid member ID' };
    }

    // 3. Create Supabase client
    const supabase = await createClient();

    // 4. Restore: Set status back to active
    const { error } = await supabase
      .from('members')
      .update({ status: 'active' })
      .eq('id', id)
      .eq('studio_id', session.studioId);

    if (error) {
      console.error('Failed to restore member:', error);
      return { success: false, error: 'Failed to restore member' };
    }

    // 5. Revalidate
    revalidatePath('/dashboard/members');
    revalidatePath(`/dashboard/members/${id}`);

    // 6. Return success
    return { success: true };
  } catch (error) {
    console.error('Restore member error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
