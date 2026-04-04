import { supabase } from '@/lib/supabase';
import { WorkoutPlans, WorkoutExercises } from '@/schema';

export class WorkoutPlanService {
  async getAllWorkoutPlans(): Promise<(WorkoutPlans & { exercises: WorkoutExercises[] })[]> {
    const { data, error } = await supabase
      .from('workout_plans')
      .select('*, workout_exercises(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getWorkoutPlanById(id: string): Promise<WorkoutPlans & { exercises: WorkoutExercises[] }> {
    const { data, error } = await supabase
      .from('workout_plans')
      .select('*, workout_exercises(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createWorkoutPlan(workoutPlan: {
    name: string;
    difficulty?: string;
    description?: string;
    exercises?: Array<{
      exercise_name: string;
      sets?: number;
      reps?: number;
      rest_seconds?: number;
    }>;
  }): Promise<WorkoutPlans> {
    // First create the workout plan
    const { data: planData, error: planError } = await supabase
      .from('workout_plans')
      .insert([{
        name: workoutPlan.name,
        difficulty: workoutPlan.difficulty || null,
        description: workoutPlan.description || null,
      }])
      .select()
      .single();

    if (planError) throw planError;
    if (!planData) throw new Error('Failed to create workout plan');

    // Then add exercises if provided
    if (workoutPlan.exercises && workoutPlan.exercises.length > 0) {
      const exercisesToInsert = workoutPlan.exercises.map(exercise => ({
        workout_plan_id: planData.id,
        exercise_name: exercise.exercise_name,
        sets: exercise.sets || null,
        reps: exercise.reps || null,
        rest_seconds: exercise.rest_seconds || null,
      }));

      const { error: exerciseError } = await supabase
        .from('workout_exercises')
        .insert(exercisesToInsert);

      if (exerciseError) throw exerciseError;
    }

    return planData;
  }

  async updateWorkoutPlan(id: string, workoutPlan: {
    name?: string;
    difficulty?: string;
    description?: string;
    exercises?: Array<{
      exercise_name: string;
      sets?: number;
      reps?: number;
      rest_seconds?: number;
    }>;
  }): Promise<WorkoutPlans> {
    // First update the workout plan basic info
    const { data: planData, error: planError } = await supabase
      .from('workout_plans')
      .update({
        name: workoutPlan.name,
        difficulty: workoutPlan.difficulty,
        description: workoutPlan.description,
      })
      .eq('id', id)
      .select()
      .single();

    if (planError) throw planError;

    // If exercises are provided, update them
    if (workoutPlan.exercises) {
      // Delete all existing exercises for this plan
      const { error: deleteError } = await supabase
        .from('workout_exercises')
        .delete()
        .eq('workout_plan_id', id);

      if (deleteError) throw deleteError;

      // Insert the new exercises
      if (workoutPlan.exercises.length > 0) {
        const exercisesToInsert = workoutPlan.exercises.map(exercise => ({
          workout_plan_id: id,
          exercise_name: exercise.exercise_name,
          sets: exercise.sets || null,
          reps: exercise.reps || null,
          rest_seconds: exercise.rest_seconds || null,
        }));

        const { error: insertError } = await supabase
          .from('workout_exercises')
          .insert(exercisesToInsert);

        if (insertError) throw insertError;
      }
    }

    return planData;
  }

  async deleteWorkoutPlan(id: string): Promise<void> {
    // First delete all exercises for this plan
    const { error: exerciseError } = await supabase
      .from('workout_exercises')
      .delete()
      .eq('workout_plan_id', id);

    if (exerciseError) throw exerciseError;

    // Then delete the plan
    const { error } = await supabase
      .from('workout_plans')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const workoutPlanService = new WorkoutPlanService();
