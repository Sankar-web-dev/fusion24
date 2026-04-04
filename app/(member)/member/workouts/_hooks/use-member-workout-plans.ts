import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { MemberWorkoutPlans, WorkoutPlans, WorkoutExercises } from '@/schema';

interface MemberWorkoutPlansWithDetails extends MemberWorkoutPlans {
  workout_plan: WorkoutPlans & { workout_exercises: WorkoutExercises[] };
}

export function useMemberWorkoutPlans() {
  return useQuery({
    queryKey: ['member-workout-plans'],
    queryFn: async (): Promise<MemberWorkoutPlansWithDetails[]> => {
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
          .from('member_workout_plans')
          .select(`
            *,
            workout_plan:workout_plans(
              *,
              workout_exercises(*)
            )
          `)
          .eq('member_id', memberData.id)
          .order('assigned_date', { ascending: false });

        if (error) {
          console.error('Workout plans query error:', error);
          throw error;
        }
        
        return data || [];
      } catch (error) {
        console.error('Error in useMemberWorkoutPlans:', error);
        throw error;
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}
