import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { membershipService } from '@/service/membership.service';
import { MembershipFormData } from '@/app/(admin)/admin/memberships/validations/membership.validation';
import { toast } from 'sonner';

const MEMBERSHIP_QUERY_KEY = 'memberships';

export const useGetMemberships = () => {
  return useQuery({
    queryKey: [MEMBERSHIP_QUERY_KEY],
    queryFn: () => membershipService.getAllMemberships(),
  });
};

export const useGetMembershipById = (id: string) => {
  return useQuery({
    queryKey: [MEMBERSHIP_QUERY_KEY, id],
    queryFn: () => membershipService.getMembershipById(id),
    enabled: !!id,
  });
};

export const useCreateMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MembershipFormData) => membershipService.createMembership(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEMBERSHIP_QUERY_KEY] });
      toast.success('Membership plan created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create membership: ${error.message}`);
    },
  });
};

export const useUpdateMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MembershipFormData }) =>
      membershipService.updateMembership(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [MEMBERSHIP_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [MEMBERSHIP_QUERY_KEY, variables.id] });
      toast.success('Membership plan updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update membership: ${error.message}`);
    },
  });
};

export const useDeleteMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => membershipService.deleteMembership(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEMBERSHIP_QUERY_KEY] });
      toast.success('Membership plan deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete membership: ${error.message}`);
    },
  });
};