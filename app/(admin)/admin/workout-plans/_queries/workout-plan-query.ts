'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutPlanService } from '@/service/workout-plan.service';

export const useGetWorkoutPlans = () => {
  return useQuery({
    queryKey: ['workout-plans'],
    queryFn: () => workoutPlanService.getAllWorkoutPlans(),
  });
};

export const useGetWorkoutPlan = (id: string) => {
  return useQuery({
    queryKey: ['workout-plans', id],
    queryFn: () => workoutPlanService.getWorkoutPlanById(id),
    enabled: !!id,
  });
};

export const useCreateWorkoutPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workoutPlanService.createWorkoutPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-plans'] });
    },
  });
};

export const useUpdateWorkoutPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      workoutPlanService.updateWorkoutPlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-plans'] });
    },
  });
};

export const useDeleteWorkoutPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workoutPlanService.deleteWorkoutPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-plans'] });
    },
  });
};
