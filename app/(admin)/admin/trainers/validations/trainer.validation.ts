import { z } from 'zod';

export const trainerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  specialization: z.string().optional().or(z.literal('')),
  experience_years: z.coerce.number().min(0, 'Experience must be a positive number').optional(),
});

export type TrainerFormData = z.infer<typeof trainerSchema>;
