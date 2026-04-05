import { supabase } from '@/lib/supabase';
import { CalorieLogs } from '@/schema';

export class CalorieService {
  async createCalorieLog(data: {
    member_id: string;
    type: 'food' | 'workout';
    item_name: string;
    quantity: string;
    calories: number;
    sets?: number;
    reps?: number;
  }): Promise<CalorieLogs> {
    const { data: result, error } = await supabase
      .from('calorie_logs')
      .insert([{
        member_id: data.member_id,
        type: data.type,
        item_name: data.item_name,
        quantity: parseInt(data.quantity) || null,
        calories: data.calories,
        sets: data.sets || null,
        reps: data.reps || null,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async getTodayCalorieLogs(memberId: string): Promise<CalorieLogs[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data, error } = await supabase
      .from('calorie_logs')
      .select('*')
      .eq('member_id', memberId)
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async deleteCalorieLog(id: string): Promise<void> {
    const { error } = await supabase
      .from('calorie_logs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const calorieService = new CalorieService();
