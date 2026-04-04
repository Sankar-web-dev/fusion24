'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { memberDietPlanService } from '@/service/member-diet-plan.service';

export const useGetMemberDietPlans = () => {
  return useQuery({
    queryKey: ['member-diet-plans'],
    queryFn: () => memberDietPlanService.getAllMemberDietPlans(),
  });
};

export const useGetMemberDietPlan = (id: string) => {
  return useQuery({
    queryKey: ['member-diet-plans', id],
    queryFn: () => memberDietPlanService.getMemberDietPlanById(id),
    enabled: !!id,
  });
};

export const useGetMemberDietPlansByMemberId = (memberId: string) => {
  return useQuery({
    queryKey: ['member-diet-plans', 'member', memberId],
    queryFn: () => memberDietPlanService.getMemberDietPlansByMemberId(memberId),
    enabled: !!memberId,
  });
};

export const useCreateMemberDietPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: memberDietPlanService.createMemberDietPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-diet-plans'] });
    },
  });
};

export const useUpdateMemberDietPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      memberDietPlanService.updateMemberDietPlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-diet-plans'] });
    },
  });
};

export const useDeleteMemberDietPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: memberDietPlanService.deleteMemberDietPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-diet-plans'] });
    },
  });
};
