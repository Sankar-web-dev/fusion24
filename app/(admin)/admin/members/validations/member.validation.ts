import { z } from 'zod';

export const memberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional(), // Password can be optional in form if handled by service
  phone: z.string().optional().nullable(),
  membership_plan_id: z.string().min(1, 'Membership plan is required'),
  trainer_id: z.string().optional().nullable(),
  joined_date: z.string().optional().nullable(),
  // Payment fields
  payment_status: z.enum(['paid', 'partial', 'unpaid']),
  payment_amount: z.coerce.number().min(0),
  billing_start: z.string().optional(),
  billing_end: z.string().optional(),
  paid_date: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.payment_status === 'unpaid' && data.payment_amount !== 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Amount must be 0 for unpaid status',
      path: ['payment_amount'],
    });
  }
  if ((data.payment_status === 'partial' || data.payment_status === 'paid') && (!data.payment_amount || data.payment_amount <= 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Amount is required for partial or paid status',
      path: ['payment_amount'],
    });
  }
  if ((data.payment_status === 'partial' || data.payment_status === 'paid') && !data.billing_start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Billing start date is required for partial or paid status',
      path: ['billing_start'],
    });
  }
  if ((data.payment_status === 'partial' || data.payment_status === 'paid') && !data.billing_end) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Billing end date is required for partial or paid status',
      path: ['billing_end'],
    });
  }
  if (data.payment_status === 'paid' && !data.paid_date) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Paid date is required for paid status',
      path: ['paid_date'],
    });
  }
});

export const memberUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  membership_plan_id: z.string().optional().nullable(),
  trainer_id: z.string().optional().nullable(),
  joined_date: z.string().optional().nullable(),
  // For update, we might also want to include payment fields if they are updated in the same form
  payment_status: z.enum(['paid', 'partial', 'unpaid']).optional(),
  payment_amount: z.coerce.number().min(0).optional(),
  billing_start: z.string().optional(),
  billing_end: z.string().optional(),
  paid_date: z.string().optional(),
});

export type MemberFormData = z.infer<typeof memberSchema>;
export type MemberUpdateFormData = z.infer<typeof memberUpdateSchema>;
