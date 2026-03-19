import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memberService } from '@/service/member.service';
import { MemberFormData, MemberUpdateFormData } from '@/app/(admin)/admin/members/validations/member.validation';
import { toast } from 'sonner';

const MEMBER_QUERY_KEY = 'members';

export const useGetMembers = () => {
  return useQuery({
    queryKey: [MEMBER_QUERY_KEY],
    queryFn: () => memberService.getAllMembers(),
  });
};

export const useGetMemberById = (id: string) => {
  return useQuery({
    queryKey: [MEMBER_QUERY_KEY, id],
    queryFn: () => memberService.getMemberById(id),
    enabled: !!id,
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MemberFormData) => memberService.createMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEMBER_QUERY_KEY] });
      toast.success('Member created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create member: ${error.message}`);
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MemberUpdateFormData }) =>
      memberService.updateMember(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [MEMBER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [MEMBER_QUERY_KEY, variables.id] });
      toast.success('Member updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update member: ${error.message}`);
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => memberService.deleteMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEMBER_QUERY_KEY] });
      toast.success('Member deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete member: ${error.message}`);
    },
  });
};
