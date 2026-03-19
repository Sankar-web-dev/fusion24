import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trainerService } from '@/service/trainer.service';
import { Trainers } from '@/schema';

export const useGetTrainers = () => {
  return useQuery({
    queryKey: ['trainers'],
    queryFn: () => trainerService.getTrainers(),
  });
};

export const useGetTrainer = (id: string) => {
  return useQuery({
    queryKey: ['trainers', id],
    queryFn: () => trainerService.getTrainerById(id),
    enabled: !!id,
  });
};

export const useCreateTrainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trainer: Omit<Trainers, 'id' | 'created_at'>) => trainerService.createTrainer(trainer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
    },
  });
};

export const useUpdateTrainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...trainer }: Partial<Trainers> & { id: string }) => 
      trainerService.updateTrainer(id, trainer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
    },
  });
};

export const useDeleteTrainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => trainerService.deleteTrainer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
    },
  });
};
