import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '@/service/payment.service';
import { Payments } from '@/schema';
import { toast } from 'sonner';

const PAYMENT_QUERY_KEY = 'payments';

export const useGetPayments = () => {
  return useQuery({
    queryKey: [PAYMENT_QUERY_KEY],
    queryFn: () => paymentService.getAllPayments(),
  });
};

export const useGetPaymentsByMemberId = (memberId: string) => {
  return useQuery({
    queryKey: [PAYMENT_QUERY_KEY, 'member', memberId],
    queryFn: () => paymentService.getPaymentsByMemberId(memberId),
    enabled: !!memberId,
  });
};

export const useGetPaymentById = (id: string) => {
  return useQuery({
    queryKey: [PAYMENT_QUERY_KEY, id],
    queryFn: () => paymentService.getPaymentById(id),
    enabled: !!id,
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Payments, 'id' | 'created_at'>) => paymentService.createPayment(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PAYMENT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PAYMENT_QUERY_KEY, 'member', data.member_id] });
      toast.success('Payment record created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create payment: ${error.message}`);
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Payments> }) =>
      paymentService.updatePayment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PAYMENT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PAYMENT_QUERY_KEY, variables.id] });
      queryClient.invalidateQueries({ queryKey: [PAYMENT_QUERY_KEY, 'member'] });
      toast.success('Payment updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update payment: ${error.message}`);
    },
  });
};

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, paidDate }: { id: string; status: 'paid' | 'partial' | 'unpaid'; paidDate?: string }) =>
      paymentService.updatePaymentStatus(id, status, paidDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENT_QUERY_KEY] });
      toast.success('Payment status updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update payment status: ${error.message}`);
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => paymentService.deletePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENT_QUERY_KEY] });
      toast.success('Payment deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete payment: ${error.message}`);
    },
  });
};
