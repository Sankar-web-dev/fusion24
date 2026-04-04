'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { memberWorkoutPlanService } from '@/service/member-workout-plan.service';

export const useGetMemberWorkoutPlans = () => {
  return useQuery({
    queryKey: ['member-workout-plans'],
    queryFn: () => memberWorkoutPlanService.getAllMemberWorkoutPlans(),
  });
};

export const useGetMemberWorkoutPlan = (id: string) => {
  return useQuery({
    queryKey: ['member-workout-plans', id],
    queryFn: () => memberWorkoutPlanService.getMemberWorkoutPlanById(id),
    enabled: !!id,
  });
};

export const useGetMemberWorkoutPlansByMemberId = (memberId: string) => {
  return useQuery({
    queryKey: ['member-workout-plans', 'member', memberId],
    queryFn: () => memberWorkoutPlanService.getMemberWorkoutPlansByMemberId(memberId),
    enabled: !!memberId,
  });
};

export const useCreateMemberWorkoutPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: memberWorkoutPlanService.createMemberWorkoutPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-workout-plans'] });
    },
  });
};

export const useUpdateMemberWorkoutPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      memberWorkoutPlanService.updateMemberWorkoutPlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-workout-plans'] });
    },
  });
};

export const useDeleteMemberWorkoutPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: memberWorkoutPlanService.deleteMemberWorkoutPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-workout-plans'] });
    },
  });
};
