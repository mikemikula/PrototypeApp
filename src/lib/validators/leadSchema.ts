import { z } from 'zod';

/**
 * Zod validation schema for lead form data
 * Defines validation rules for all form fields per PRD requirements
 */
export const leadSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),

  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  phone: z
    .string()
    .optional()
    .refine(
      (val: string | undefined) =>
        !val || /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-\(\)]/g, '')),
      'Please enter a valid phone number',
    ),

  projectBudget: z.string().min(1, 'Please select a project budget'),

  message: z
    .string()
    .max(500, 'Message must be less than 500 characters')
    .optional(),
});

/**
 * TypeScript type derived from the Zod schema
 * Use this type for type-safe form handling
 */
export type LeadFormData = z.infer<typeof leadSchema>;

/**
 * Project budget options for the form dropdown
 * These values should match what's stored in the database
 */
export const PROJECT_BUDGET_OPTIONS = [
  { value: '$10,000 - $25,000', label: '$10,000 - $25,000' },
  { value: '$25,000 - $50,000', label: '$25,000 - $50,000' },
  { value: '$50,000 - $100,000', label: '$50,000 - $100,000' },
  { value: '$100,000 - $250,000', label: '$100,000 - $250,000' },
  { value: '$250,000+', label: '$250,000+' },
] as const;
