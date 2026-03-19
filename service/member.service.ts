import { supabase, supabaseAdmin } from '@/lib/supabase';
import { Members } from '@/schema';
import { MemberFormData, MemberUpdateFormData } from '@/app/(admin)/admin/members/validations/member.validation';

export class MemberService {
  async getAllMembers(): Promise<Members[]> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getMemberById(id: string): Promise<Members> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createMember(member: MemberFormData): Promise<Members> {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: member.email,
      password: 'fusion24@123',
      options: {
        data: {
          role: 'member',
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create auth user');

    const { data, error } = await supabase
      .from('members')
      .insert([{
        auth_user_id: authData.user.id,
        name: member.name,
        email: member.email,
        phone: member.phone || null,
        membership_plan_id: member.membership_plan_id || null,
        trainer_id: member.trainer_id || null,
        joined_date: member.joined_date || new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw error;
    }

    // Create payment record if membership plan is selected
    if (member.membership_plan_id) {
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([{
          member_id: data.id,
          membership_plan_id: member.membership_plan_id,
          amount: member.payment_amount || 0,
          paid_amount: member.payment_status === 'paid' || member.payment_status === 'partial' 
            ? member.payment_amount || 0 
            : 0,
          billing_start: member.billing_start ? new Date(member.billing_start).toISOString() : new Date().toISOString(),
          billing_end: member.billing_end ? new Date(member.billing_end).toISOString() : null,
          status: member.payment_status || 'unpaid',
          paid_date: member.paid_date ? new Date(member.paid_date).toISOString() : null,
        }]);

      if (paymentError) {
        console.warn('Failed to create payment record:', paymentError);
        // Don't throw error here - member creation succeeded, payment can be added later
      }
    }

    return data;
  }

  async updateMember(id: string, member: MemberUpdateFormData): Promise<Members> {
    const { data, error } = await supabase
      .from('members')
      .update({
        name: member.name,
        email: member.email,
        phone: member.phone || null,
        membership_plan_id: member.membership_plan_id || null,
        trainer_id: member.trainer_id || null,
        joined_date: member.joined_date || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteMember(id: string): Promise<void> {
    const member = await this.getMemberById(id);
    
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Delete from auth system if auth_user_id exists
    if (member.auth_user_id && supabaseAdmin) {
      try {
        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(member.auth_user_id);
        if (authError) {
          console.error('Failed to delete auth user:', authError);
          // Don't throw error here - member deletion succeeded, auth cleanup failed
        } else {
          console.log('Auth user deleted successfully:', member.auth_user_id);
        }
      } catch (authError) {
        console.error('Exception during auth user deletion:', authError);
        // Don't throw error here - member deletion succeeded
      }
    } else {
      if (!member.auth_user_id) {
        console.warn('No auth_user_id found for member:', id);
      } else {
        console.warn('SUPABASE_SERVICE_ROLE_KEY not configured - skipping auth user deletion for member:', id);
      }
    }
  }
}

export const memberService = new MemberService();
