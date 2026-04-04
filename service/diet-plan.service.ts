import { supabase } from '@/lib/supabase';
import { DietPlans, DietMeals } from '@/schema';

export class DietPlanService {
  async getAllDietPlans(): Promise<(DietPlans & { meals: DietMeals[] })[]> {
    const { data, error } = await supabase
      .from('diet_plans')
      .select(`
        *,
        diet_meals(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getDietPlanById(id: string): Promise<DietPlans & { meals: DietMeals[] }> {
    const { data, error } = await supabase
      .from('diet_plans')
      .select(`
        *,
        diet_meals(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createDietPlan(dietPlan: {
    name: string;
    description?: string;
    meals?: Array<{
      meal_type: string;
      food_name: string;
      calories: number;
    }>;
  }): Promise<DietPlans> {
    // First create the diet plan
    const { data: planData, error: planError } = await supabase
      .from('diet_plans')
      .insert([{
        name: dietPlan.name,
        description: dietPlan.description,
      }])
      .select()
      .single();

    if (planError) throw planError;

    // Then create the meals if provided
    if (dietPlan.meals && dietPlan.meals.length > 0) {
      const mealsToInsert = dietPlan.meals.map(meal => ({
        diet_plan_id: planData.id,
        meal_type: meal.meal_type,
        food_name: meal.food_name,
        calories: meal.calories,
      }));

      const { error: mealsError } = await supabase
        .from('diet_meals')
        .insert(mealsToInsert);

      if (mealsError) throw mealsError;
    }

    return planData;
  }

  async updateDietPlan(id: string, dietPlan: {
    name?: string;
    description?: string;
    meals?: Array<{
      meal_type: string;
      food_name: string;
      calories: number;
    }>;
  }): Promise<DietPlans> {
    // First update the diet plan
    const { data: planData, error: planError } = await supabase
      .from('diet_plans')
      .update({
        name: dietPlan.name,
        description: dietPlan.description,
      })
      .eq('id', id)
      .select()
      .single();

    if (planError) throw planError;

    // If meals are provided, delete existing meals and create new ones
    if (dietPlan.meals) {
      // Delete existing meals
      const { error: deleteError } = await supabase
        .from('diet_meals')
        .delete()
        .eq('diet_plan_id', id);

      if (deleteError) throw deleteError;

      // Create new meals
      if (dietPlan.meals.length > 0) {
        const mealsToInsert = dietPlan.meals.map(meal => ({
          diet_plan_id: id,
          meal_type: meal.meal_type,
          food_name: meal.food_name,
          calories: meal.calories,
        }));

        const { error: mealsError } = await supabase
          .from('diet_meals')
          .insert(mealsToInsert);

        if (mealsError) throw mealsError;
      }
    }

    return planData;
  }

  async deleteDietPlan(id: string): Promise<void> {
    // First delete associated meals
    const { error: mealsError } = await supabase
      .from('diet_meals')
      .delete()
      .eq('diet_plan_id', id);

    if (mealsError) throw mealsError;

    // Then delete the diet plan
    const { error } = await supabase
      .from('diet_plans')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const dietPlanService = new DietPlanService();
