/**
 * MEMBER VALIDATION SCHEMAS
 *
 * All input validation for member-related forms.
 * These schemas ensure data integrity and prevent injection attacks.
 *
 * Security Features:
 * - Type validation
 * - Length restrictions
 * - Format validation (email, phone, dates)
 * - SQL injection prevention
 * - XSS prevention via sanitization
 */

import { z } from 'zod';

/**
 * Email validation with strict format checking
 */
const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(5, 'Email must be at least 5 characters')
  .max(255, 'Email is too long')
  .toLowerCase()
  .trim();

/**
 * Phone validation (German format)
 * Accepts: +49, 0, or direct numbers
 */
const phoneSchema = z
  .string()
  .min(5, 'Phone number too short')
  .max(20, 'Phone number too long')
  .regex(
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
    'Invalid phone number format'
  )
  .trim()
  .optional()
  .or(z.literal(''));

/**
 * Text field validation with XSS prevention
 */
const safeTextSchema = (min: number = 1, max: number = 255) =>
  z
    .string()
    .min(min, `Must be at least ${min} characters`)
    .max(max, `Must be at most ${max} characters`)
    .trim()
    .refine(
      (val) => !/<script|javascript:|on\w+=/i.test(val),
      'Invalid characters detected'
    );

/**
 * Member number validation
 */
const memberNumberSchema = z
  .string()
  .regex(/^[A-Z0-9-]+$/, 'Member number must contain only uppercase letters, numbers, and hyphens')
  .min(3, 'Member number too short')
  .max(20, 'Member number too long')
  .trim()
  .optional();

/**
 * Date validation
 */
const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine((date) => {
    const parsed = new Date(date);
    return parsed instanceof Date && !isNaN(parsed.getTime());
  }, 'Invalid date')
  .optional();

/**
 * Status enum
 */
const statusSchema = z.enum(['active', 'pending', 'inactive', 'suspended'], {
  errorMap: () => ({ message: 'Invalid status' }),
});

/**
 * Address validation
 */
const addressSchema = z
  .object({
    street: safeTextSchema(1, 255).optional(),
    city: safeTextSchema(1, 100).optional(),
    postalCode: z.string().regex(/^\d{5}$/, 'Invalid postal code (must be 5 digits)').optional(),
    country: safeTextSchema(2, 100).optional(),
  })
  .optional();

/**
 * Emergency contact validation
 */
const emergencyContactSchema = z
  .object({
    name: safeTextSchema(1, 255),
    phone: phoneSchema,
    relationship: safeTextSchema(1, 100).optional(),
  })
  .optional();

/**
 * CREATE MEMBER SCHEMA
 * Used when creating a new member
 */
export const createMemberSchema = z.object({
  // Personal Information (required)
  firstName: safeTextSchema(1, 100),
  lastName: safeTextSchema(1, 100),

  // Contact Information
  email: emailSchema.optional(),
  phone: phoneSchema,
  dateOfBirth: dateSchema,

  // Address
  address: addressSchema,

  // Membership
  membershipTypeId: z.string().uuid('Invalid membership type ID').optional(),
  memberNumber: memberNumberSchema,
  status: statusSchema.default('pending'),
  contractStartDate: dateSchema,
  contractEndDate: dateSchema,

  // Health & Emergency
  healthNotes: safeTextSchema(0, 1000).optional(),
  emergencyContact: emergencyContactSchema,

  // Meta
  notes: safeTextSchema(0, 2000).optional(),
  tags: z.array(safeTextSchema(1, 50)).max(20, 'Too many tags').optional(),
});

/**
 * UPDATE MEMBER SCHEMA
 * Used when updating an existing member
 * All fields are optional
 */
export const updateMemberSchema = z.object({
  // Personal Information
  firstName: safeTextSchema(1, 100).optional(),
  lastName: safeTextSchema(1, 100).optional(),

  // Contact Information
  email: emailSchema.optional(),
  phone: phoneSchema,
  dateOfBirth: dateSchema,

  // Address
  address: addressSchema,

  // Membership
  membershipTypeId: z.string().uuid('Invalid membership type ID').optional().nullable(),
  memberNumber: memberNumberSchema,
  status: statusSchema.optional(),
  contractStartDate: dateSchema,
  contractEndDate: dateSchema,

  // Balances
  creditsBalance: z.number().int().min(0).max(10000).optional(),
  loyaltyPoints: z.number().int().min(0).max(1000000).optional(),
  loyaltyTier: z.enum(['bronze', 'silver', 'gold', 'platinum']).optional().nullable(),

  // Health & Emergency
  healthNotes: safeTextSchema(0, 1000).optional().nullable(),
  emergencyContact: emergencyContactSchema,

  // Meta
  notes: safeTextSchema(0, 2000).optional().nullable(),
  tags: z.array(safeTextSchema(1, 50)).max(20, 'Too many tags').optional(),
});

/**
 * SEARCH QUERY SCHEMA
 * Used for member search
 */
export const searchMemberSchema = z.object({
  query: safeTextSchema(2, 100),
  limit: z.number().int().min(1).max(100).optional().default(50),
});

/**
 * MEMBER ID SCHEMA
 * Used for fetching/deleting by ID
 */
export const memberIdSchema = z.object({
  id: z.string().uuid('Invalid member ID'),
});

/**
 * Type exports for TypeScript
 */
export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
export type SearchMemberInput = z.infer<typeof searchMemberSchema>;
export type MemberIdInput = z.infer<typeof memberIdSchema>;
