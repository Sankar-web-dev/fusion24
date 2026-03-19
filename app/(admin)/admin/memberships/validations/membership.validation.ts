import { z } from 'zod';

export const membershipSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  duration_months: z.coerce.number().min(1, 'Duration must be at least 1 month').max(60, 'Duration cannot exceed 60 months'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  description: z.string().optional().nullable(),
});

export type MembershipFormData = z.infer<typeof membershipSchema>;
