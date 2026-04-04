import { z } from 'zod';

export const dietPlanSchema = z.object({
  name: z.string().min(1, 'Diet plan name is required'),
  description: z.string().optional(),
  meals: z.array(z.object({
    meal_type: z.string().min(1, 'Meal type is required'),
    food_name: z.string().min(1, 'Food name is required'),
    calories: z.number().min(0, 'Calories must be 0 or greater'),
  })).optional(),
});

export const dietPlanUpdateSchema = z.object({
  name: z.string().min(1, 'Diet plan name is required').optional(),
  description: z.string().optional(),
  meals: z.array(z.object({
    meal_type: z.string().min(1, 'Meal type is required'),
    food_name: z.string().min(1, 'Food name is required'),
    calories: z.number().min(0, 'Calories must be 0 or greater'),
  })).optional(),
});

export type DietPlanFormData = z.infer<typeof dietPlanSchema>;
export type DietPlanUpdateFormData = z.infer<typeof dietPlanUpdateSchema>;
