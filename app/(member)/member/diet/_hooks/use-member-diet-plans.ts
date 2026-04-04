import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { MemberDietPlans, DietPlans, DietMeals } from '@/schema';

interface MemberDietPlansWithDetails extends MemberDietPlans {
  diet_plan: DietPlans & { diet_meals: DietMeals[] };
}

export function useMemberDietPlans() {
  return useQuery({
    queryKey: ['member-diet-plans'],
    queryFn: async (): Promise<MemberDietPlansWithDetails[]> => {
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
          .maybeSingle(); // Use maybeSingle instead of single to handle no results

        if (memberError) {
          console.error('Member lookup error:', memberError);
          throw memberError;
        }
        
        // If no member record exists, return empty array
        if (!memberData) {
          console.log('No member record found for user:', user.id);
          return [];
        }

        const { data, error } = await supabase
          .from('member_diet_plans')
          .select(`
            *,
            diet_plan:diet_plans(
              *,
              diet_meals(*)
            )
          `)
          .eq('member_id', memberData.id)
          .order('assigned_date', { ascending: false });

        if (error) {
          console.error('Diet plans query error:', error);
          throw error;
        }
        
        return data || [];
      } catch (error) {
        console.error('Error in useMemberDietPlans:', error);
        throw error;
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}
