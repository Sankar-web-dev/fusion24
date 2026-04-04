import { supabase } from '@/lib/supabase';
import { MemberDietPlans, DietPlans, DietMeals } from '@/schema';

export class MemberDietPlanService {
  async getAllMemberDietPlans(): Promise<(MemberDietPlans & { 
    member: { name: string; email: string }, 
    diet_plan: DietPlans & { diet_meals: DietMeals[] } 
  })[]> {
    const { data, error } = await supabase
      .from('member_diet_plans')
      .select(`
        *,
        member:members(name,email),
        diet_plan:diet_plans(*, diet_meals(*))
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getMemberDietPlanById(id: string): Promise<MemberDietPlans & { 
    member: { name: string; email: string }, 
    diet_plan: DietPlans & { diet_meals: DietMeals[] } 
  }> {
    const { data, error } = await supabase
      .from('member_diet_plans')
      .select(`
        *,
        member:members(name,email),
        diet_plan:diet_plans(*, diet_meals(*))
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getMemberDietPlansByMemberId(memberId: string): Promise<(MemberDietPlans & { 
    diet_plan: DietPlans & { diet_meals: DietMeals[] } 
  })[]> {
    const { data, error } = await supabase
      .from('member_diet_plans')
      .select(`
        *,
        diet_plan:diet_plans(*, diet_meals(*))
      `)
      .eq('member_id', memberId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createMemberDietPlan(memberDietPlan: {
    member_id: string;
    diet_plan_id: string;
    assigned_date?: string;
  }): Promise<MemberDietPlans> {
    const { data, error } = await supabase
      .from('member_diet_plans')
      .insert([{
        member_id: memberDietPlan.member_id,
        diet_plan_id: memberDietPlan.diet_plan_id,
        assigned_date: memberDietPlan.assigned_date || new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateMemberDietPlan(id: string, memberDietPlan: {
    member_id?: string;
    diet_plan_id?: string;
    assigned_date?: string;
  }): Promise<MemberDietPlans> {
    const { data, error } = await supabase
      .from('member_diet_plans')
      .update({
        member_id: memberDietPlan.member_id,
        diet_plan_id: memberDietPlan.diet_plan_id,
        assigned_date: memberDietPlan.assigned_date,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteMemberDietPlan(id: string): Promise<void> {
    const { error } = await supabase
      .from('member_diet_plans')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const memberDietPlanService = new MemberDietPlanService();
