import { z } from 'zod';

export const workoutPlanSchema = z.object({
  name: z.string().min(1, 'Workout plan name is required'),
  difficulty: z.string().optional(),
  description: z.string().optional(),
  exercises: z.array(z.object({
    exercise_name: z.string().min(1, 'Exercise name is required'),
    sets: z.number().min(1).optional(),
    reps: z.number().min(1).optional(),
    rest_seconds: z.number().min(0).optional(),
  })).optional(),
});

export const workoutPlanUpdateSchema = z.object({
  name: z.string().min(1, 'Workout plan name is required').optional(),
  difficulty: z.string().optional(),
  description: z.string().optional(),
  exercises: z.array(z.object({
    exercise_name: z.string().min(1, 'Exercise name is required'),
    sets: z.number().min(1).optional(),
    reps: z.number().min(1).optional(),
    rest_seconds: z.number().min(0).optional(),
  })).optional(),
});

export type WorkoutPlanFormData = z.infer<typeof workoutPlanSchema>;
export type WorkoutPlanUpdateFormData = z.infer<typeof workoutPlanUpdateSchema>;
