import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { CalorieLogs } from '@/schema';
import { calorieService } from '@/service/calorie.service';

export function useCalorieLogs() {
  return useQuery({
    queryKey: ['calorie-logs'],
    queryFn: async (): Promise<CalorieLogs[]> => {
      try {
        // Get current user from Supabase auth
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        if (!user) throw new Error('User not authenticated');

        // Get member ID from auth user
        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('id')
          .eq('auth_user_id', user.id)
          .maybeSingle();

        if (memberError) throw memberError;
        if (!memberData) throw new Error('Member not found');

        // Get today's calorie logs using service
        return await calorieService.getTodayCalorieLogs(memberData.id);

      } catch (error) {
        console.error('Error fetching calorie logs:', error);
        throw error;
      }
    },
  });
}

export function useCreateCalorieLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      type: 'food' | 'workout';
      item_name: string;
      quantity: string;
      calories: number;
      sets?: number;
      reps?: number;
    }) => {
      // Get current user from Supabase auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) throw authError;
      if (!user) throw new Error('User not authenticated');

      // Get member ID from auth user
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('id')
        .eq('auth_user_id', user.id)
        .maybeSingle();

      if (memberError) throw memberError;
      if (!memberData) throw new Error('Member not found');

      // Create calorie log using service
      return await calorieService.createCalorieLog({
        member_id: memberData.id,
        type: data.type,
        item_name: data.item_name,
        quantity: data.quantity,
        calories: data.calories,
        sets: data.sets,
        reps: data.reps,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calorie-logs'] });
    },
  });
}
