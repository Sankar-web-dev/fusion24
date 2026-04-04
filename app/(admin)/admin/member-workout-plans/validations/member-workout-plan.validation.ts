import { z } from 'zod';

export const memberWorkoutPlanSchema = z.object({
  member_id: z.string().min(1, 'Member is required'),
  workout_plan_id: z.string().min(1, 'Workout plan is required'),
});

export const memberWorkoutPlanUpdateSchema = z.object({
  member_id: z.string().min(1, 'Member is required').optional(),
  workout_plan_id: z.string().min(1, 'Workout plan is required').optional(),
  assigned_date: z.string().optional(),
});

export type MemberWorkoutPlanFormData = z.infer<typeof memberWorkoutPlanSchema>;
export type MemberWorkoutPlanUpdateFormData = z.infer<typeof memberWorkoutPlanUpdateSchema>;
