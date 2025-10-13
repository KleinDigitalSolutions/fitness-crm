/**
 * STUDIO VALIDATION SCHEMAS
 *
 * All input validation for studio-related forms.
 *
 * Security Features:
 * - Type validation
 * - Length restrictions
 * - Format validation
 * - XSS prevention
 */

import { z } from 'zod';

/**
 * Safe text validation with XSS prevention
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
 * Email validation
 */
const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(255, 'Email is too long')
  .toLowerCase()
  .trim()
  .optional();

/**
 * Phone validation
 */
const phoneSchema = z
  .string()
  .min(5, 'Phone number too short')
  .max(20, 'Phone number too long')
  .trim()
  .optional();

/**
 * URL validation
 */
const urlSchema = z
  .string()
  .url('Invalid URL format')
  .max(500, 'URL is too long')
  .optional()
  .or(z.literal(''));

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
 * CREATE STUDIO SCHEMA
 */
export const createStudioSchema = z.object({
  name: safeTextSchema(1, 200),
  description: safeTextSchema(0, 1000).optional(),
  address: addressSchema,
  phone: phoneSchema,
  email: emailSchema,
  website: urlSchema,
  logoUrl: urlSchema,
});

/**
 * UPDATE STUDIO SCHEMA
 */
export const updateStudioSchema = z.object({
  name: safeTextSchema(1, 200).optional(),
  description: safeTextSchema(0, 1000).optional().nullable(),
  address: addressSchema,
  phone: phoneSchema.nullable(),
  email: emailSchema.nullable(),
  website: urlSchema.nullable(),
  logoUrl: urlSchema.nullable(),
});

/**
 * STUDIO ID SCHEMA
 */
export const studioIdSchema = z.object({
  id: z.string().uuid('Invalid studio ID'),
});

/**
 * Type exports for TypeScript
 */
export type CreateStudioInput = z.infer<typeof createStudioSchema>;
export type UpdateStudioInput = z.infer<typeof updateStudioSchema>;
export type StudioIdInput = z.infer<typeof studioIdSchema>;
