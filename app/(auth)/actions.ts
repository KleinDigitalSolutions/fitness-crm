'use server'

/**
 * AUTHENTICATION SERVER ACTIONS
 *
 * These server actions handle authentication flows securely on the server side.
 * Benefits:
 * - Server-side execution (more secure)
 * - No client-side API keys exposed
 * - CSRF protection built-in
 * - Type-safe with TypeScript
 * - Progressive enhancement support
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  studioName: z.string().min(2, 'Studio name is required'),
})

// ============================================================================
// ACTION RESPONSE TYPES
// ============================================================================

export type ActionResponse<T = void> = {
  success: boolean
  error?: string
  data?: T
}

// ============================================================================
// LOGIN ACTION
// ============================================================================

/**
 * Login a user with email and password
 *
 * @param formData - Form data containing email and password
 * @returns ActionResponse with success status
 */
export async function loginAction(
  formData: FormData
): Promise<ActionResponse> {
  // 1. Extract and validate input
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validation = loginSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors[0].message,
    }
  }

  const { email, password } = validation.data

  // 2. Attempt login
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  // 3. Revalidate and redirect
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// ============================================================================
// REGISTER ACTION
// ============================================================================

/**
 * Register a new user and create their studio
 *
 * @param formData - Form data with user and studio details
 * @returns ActionResponse with success status
 */
export async function registerAction(
  formData: FormData
): Promise<ActionResponse> {
  // 1. Extract and validate input
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    studioName: formData.get('studioName') as string,
  }

  const validation = registerSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors[0].message,
    }
  }

  const { email, password, firstName, lastName, studioName } = validation.data

  // 2. Create user account
  const supabase = await createClient()

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError || !authData.user) {
    return {
      success: false,
      error: signUpError?.message || 'Failed to create account',
    }
  }

  // 3. Create studio
  const { data: studio, error: studioError } = await supabase
    .from('studios')
    .insert({
      name: studioName,
      owner_id: authData.user.id,
      slug: studioName.toLowerCase().replace(/\s+/g, '-'),
    })
    .select()
    .single()

  if (studioError || !studio) {
    // Rollback: delete the user (if possible)
    // Note: Supabase doesn't allow deleting users from client
    return {
      success: false,
      error: 'Failed to create studio. Please contact support.',
    }
  }

  // 4. Create user profile
  const { error: profileError } = await supabase.from('profiles').insert({
    user_id: authData.user.id,
    studio_id: studio.id,
    role: 'studio_admin',
    first_name: firstName,
    last_name: lastName,
  })

  if (profileError) {
    return {
      success: false,
      error: 'Failed to create profile. Please contact support.',
    }
  }

  // 5. Success - revalidate and redirect
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// ============================================================================
// LOGOUT ACTION
// ============================================================================

/**
 * Logout the current user
 *
 * @returns ActionResponse with success status
 */
export async function logoutAction(): Promise<ActionResponse> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

// ============================================================================
// PASSWORD RESET REQUEST ACTION
// ============================================================================

/**
 * Send password reset email
 *
 * @param formData - Form data with email
 * @returns ActionResponse with success status
 */
export async function requestPasswordResetAction(
  formData: FormData
): Promise<ActionResponse> {
  const email = formData.get('email') as string

  if (!email || !z.string().email().safeParse(email).success) {
    return {
      success: false,
      error: 'Invalid email address',
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
  }
}

// ============================================================================
// PASSWORD RESET ACTION
// ============================================================================

/**
 * Reset password with new password
 *
 * @param formData - Form data with new password
 * @returns ActionResponse with success status
 */
export async function resetPasswordAction(
  formData: FormData
): Promise<ActionResponse> {
  const password = formData.get('password') as string

  if (!password || password.length < 8) {
    return {
      success: false,
      error: 'Password must be at least 8 characters',
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
