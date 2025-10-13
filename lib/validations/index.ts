/**
 * VALIDATION SCHEMAS - MAIN EXPORT
 *
 * Single entry point for all validation schemas.
 *
 * USAGE:
 * ======
 *
 * ```typescript
 * import { createMemberSchema } from '@/lib/validations';
 *
 * const result = createMemberSchema.safeParse(formData);
 * if (!result.success) {
 *   // Handle validation errors
 *   console.error(result.error.errors);
 * }
 * ```
 *
 * SECURITY BENEFITS:
 * ==================
 *
 * ✅ Type-safe validation
 * ✅ XSS prevention (script tag detection)
 * ✅ SQL injection prevention (via type validation)
 * ✅ Length restrictions (DoS prevention)
 * ✅ Format validation (email, phone, dates)
 * ✅ Input sanitization (trim, lowercase)
 * ✅ Custom validation rules
 *
 * ALWAYS validate on the SERVER SIDE!
 * Client-side validation is for UX only.
 */

// Authentication
export * from './auth';

// Members
export * from './member';

// Studios
export * from './studio';
