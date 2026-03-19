import { supabase } from '@/lib/supabase';
import { MembershipPlans } from '@/schema';
import { MembershipFormData } from '@/app/(admin)/admin/memberships/validations/membership.validation';

export class MembershipService {
  async getAllMemberships(): Promise<MembershipPlans[]> {
    const { data, error } = await supabase
      .from('membership_plans')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getMembershipById(id: string): Promise<MembershipPlans> {
    const { data, error } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createMembership(membership: MembershipFormData): Promise<MembershipPlans> {
    const { data, error } = await supabase
      .from('membership_plans')
      .insert([membership])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateMembership(id: string, membership: MembershipFormData): Promise<MembershipPlans> {
    const { data, error } = await supabase
      .from('membership_plans')
      .update(membership)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteMembership(id: string): Promise<void> {
    const { error } = await supabase
      .from('membership_plans')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const membershipService = new MembershipService();