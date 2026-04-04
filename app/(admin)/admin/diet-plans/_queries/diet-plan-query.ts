'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dietPlanService } from '@/service/diet-plan.service';

export const useGetDietPlans = () => {
  return useQuery({
    queryKey: ['diet-plans'],
    queryFn: () => dietPlanService.getAllDietPlans(),
  });
};

export const useGetDietPlan = (id: string) => {
  return useQuery({
    queryKey: ['diet-plans', id],
    queryFn: () => dietPlanService.getDietPlanById(id),
    enabled: !!id,
  });
};

export const useCreateDietPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dietPlanService.createDietPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diet-plans'] });
    },
  });
};

export const useUpdateDietPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      dietPlanService.updateDietPlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diet-plans'] });
    },
  });
};

export const useDeleteDietPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dietPlanService.deleteDietPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diet-plans'] });
    },
  });
};
