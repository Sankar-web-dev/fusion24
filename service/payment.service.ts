import { supabase } from '@/lib/supabase';
import { Payments } from '@/schema';

export class PaymentService {
  async getAllPayments(): Promise<Payments[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getPaymentsByMemberId(memberId: string): Promise<Payments[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('member_id', memberId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getPaymentById(id: string): Promise<Payments> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createPayment(payment: Omit<Payments, 'id' | 'created_at'>): Promise<Payments> {
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePayment(id: string, payment: Partial<Payments>): Promise<Payments> {
    const { data, error } = await supabase
      .from('payments')
      .update(payment)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deletePayment(id: string): Promise<void> {
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async updatePaymentStatus(id: string, status: 'paid' | 'partial' | 'unpaid', paidDate?: string): Promise<Payments> {
    const updateData: Partial<Payments> = { status };
    if (paidDate && status === 'paid') {
      updateData.paid_date = new Date(paidDate);
    }

    return this.updatePayment(id, updateData);
  }
}

export const paymentService = new PaymentService();
