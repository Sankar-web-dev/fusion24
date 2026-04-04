import { supabase } from '@/lib/supabase';
import { MemberWorkoutPlans, WorkoutPlans, WorkoutExercises } from '@/schema';

export class MemberWorkoutPlanService {
  async getAllMemberWorkoutPlans(): Promise<(MemberWorkoutPlans & { 
    member: { name: string; email: string }, 
    workout_plan: WorkoutPlans & { exercises: WorkoutExercises[] } 
  })[]> {
    const { data, error } = await supabase
      .from('member_workout_plans')
      .select(`
        *,
        member:members(name,email),
        workout_plan:workout_plans(*, workout_exercises(*))
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getMemberWorkoutPlanById(id: string): Promise<MemberWorkoutPlans & { 
    member: { name: string; email: string }, 
    workout_plan: WorkoutPlans & { exercises: WorkoutExercises[] } 
  }> {
    const { data, error } = await supabase
      .from('member_workout_plans')
      .select(`
        *,
        member:members(name,email),
        workout_plan:workout_plans(*, workout_exercises(*))
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getMemberWorkoutPlansByMemberId(memberId: string): Promise<(MemberWorkoutPlans & { 
    workout_plan: WorkoutPlans & { exercises: WorkoutExercises[] } 
  })[]> {
    const { data, error } = await supabase
      .from('member_workout_plans')
      .select(`
        *,
        workout_plan:workout_plans(*, workout_exercises(*))
      `)
      .eq('member_id', memberId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createMemberWorkoutPlan(memberWorkoutPlan: {
    member_id: string;
    workout_plan_id: string;
    assigned_date?: string;
  }): Promise<MemberWorkoutPlans> {
    const { data, error } = await supabase
      .from('member_workout_plans')
      .insert([{
        member_id: memberWorkoutPlan.member_id,
        workout_plan_id: memberWorkoutPlan.workout_plan_id,
        assigned_date: memberWorkoutPlan.assigned_date || new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateMemberWorkoutPlan(id: string, memberWorkoutPlan: {
    member_id?: string;
    workout_plan_id?: string;
    assigned_date?: string;
  }): Promise<MemberWorkoutPlans> {
    const { data, error } = await supabase
      .from('member_workout_plans')
      .update({
        member_id: memberWorkoutPlan.member_id,
        workout_plan_id: memberWorkoutPlan.workout_plan_id,
        assigned_date: memberWorkoutPlan.assigned_date,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteMemberWorkoutPlan(id: string): Promise<void> {
    const { error } = await supabase
      .from('member_workout_plans')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const memberWorkoutPlanService = new MemberWorkoutPlanService();
