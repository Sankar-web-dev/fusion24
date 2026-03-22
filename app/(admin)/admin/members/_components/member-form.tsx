'use client';

import { useForm, FieldErrors, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema, memberUpdateSchema, MemberFormData, MemberUpdateFormData } from '@/app/(admin)/admin/members/validations/member.validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Members, MembershipPlans, Trainers } from '@/schema';
import { Loader2, CreditCard } from 'lucide-react';
import { useGetMemberships } from '@/app/(admin)/admin/memberships/_query/membership-query';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface MemberFormProps {
  initialData?: Members & { payments?: any[] };
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  membershipsLoading?: boolean;
  trainersLoading?: boolean;
}

export function MemberForm({ initialData, onSubmit, isLoading }: MemberFormProps) {
  const { data: memberships } = useGetMemberships();
  const [trainers, setTrainers] = useState<Trainers[]>([]);
  const [trainersLoading, setTrainersLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      setTrainersLoading(true);
      const { data } = await supabase.from('trainers').select('*').order('name');
      if (data) setTrainers(data);
      setTrainersLoading(false);
    };
    fetchTrainers();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MemberFormData | MemberUpdateFormData>({
    resolver: zodResolver(initialData ? memberUpdateSchema : memberSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          phone: initialData.phone || '',
          membership_plan_id: initialData.membership_plan_id || '',
          trainer_id: initialData.trainer_id || '',
          joined_date: initialData.joined_date 
            ? new Date(initialData.joined_date).toISOString().split('T')[0] 
            : '',
          payment_status: initialData.payments?.[0]?.status || 'unpaid',
          payment_amount: initialData.payments?.[0]?.amount || 0,
          billing_start: initialData.payments?.[0]?.billing_start 
            ? new Date(initialData.payments?.[0].billing_start).toISOString().split('T')[0] 
            : '',
          billing_end: initialData.payments?.[0]?.billing_end 
            ? new Date(initialData.payments?.[0].billing_end).toISOString().split('T')[0] 
            : '',
          paid_date: initialData.payments?.[0]?.paid_date 
            ? new Date(initialData.payments?.[0].paid_date).toISOString().split('T')[0] 
            : '',
        }
      : {
          name: '',
          email: '',
          password: 'fusion24@123',
          phone: '',
          membership_plan_id: '',
          trainer_id: '',
          joined_date: new Date().toISOString().split('T')[0],
          payment_status: 'unpaid',
          payment_amount: 0,
          billing_start: new Date().toISOString().split('T')[0],
          billing_end: '',
          paid_date: '',
        },
  });

  // Update form values when trainers are loaded and we have initial data
  useEffect(() => {
    if (initialData && !trainersLoading && trainers.length > 0) {
      setValue('trainer_id', initialData.trainer_id || '');
    }
  }, [initialData, trainersLoading, trainers, setValue]);

  const selectedMembershipPlanId = watch('membership_plan_id');
  const selectedMembershipPlan = memberships?.find(plan => plan.id === selectedMembershipPlanId) || 
    (initialData?.membership_plan_id ? memberships?.find(plan => plan.id === initialData.membership_plan_id) : undefined);
  const selectedTrainerId = watch('trainer_id');
  const selectedTrainer = trainers?.find(trainer => trainer.id === selectedTrainerId) ||
    (initialData?.trainer_id ? trainers?.find(trainer => trainer.id === initialData.trainer_id) : undefined);
  const billingStart = watch('billing_start');
  const paymentStatus = watch('payment_status');

  // Auto-calculate billing end date when membership plan and start date are selected
  useEffect(() => {
    if (selectedMembershipPlan && billingStart && !initialData) {
      const startDate = new Date(billingStart);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + selectedMembershipPlan.duration_months);
      
      // Set the billing_end field programmatically
      const endDateString = endDate.toISOString().split('T')[0];
      setValue('billing_end' as keyof MemberFormData, endDateString);
    }
  }, [selectedMembershipPlan, billingStart, initialData, setValue]);

  // Auto-set payment amount and paid date when status is 'paid'
  useEffect(() => {
    if (paymentStatus === 'paid' && selectedMembershipPlan) {
      // Set payment amount to membership price
      setValue('payment_amount' as keyof MemberFormData, selectedMembershipPlan.price);
      
      // Set billing start date to today if not set
      if (!billingStart) {
        const today = new Date().toISOString().split('T')[0];
        setValue('billing_start' as keyof MemberFormData, today);
      }
      
      // Calculate and set billing end date
      const startDate = billingStart ? new Date(billingStart) : new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + selectedMembershipPlan.duration_months);
      const endDateString = endDate.toISOString().split('T')[0];
      setValue('billing_end' as keyof MemberFormData, endDateString);
      
      // Set paid date to today
      const today = new Date().toISOString().split('T')[0];
      setValue('paid_date' as keyof MemberFormData, today);
    }
  }, [paymentStatus, selectedMembershipPlan, billingStart, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-300 font-medium ml-1">
            Full Name <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="e.g., John Doe"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.name && (
            <p className="text-sm text-red-400 ml-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300 font-medium ml-1">
            Email Address <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="e.g., john@example.com"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.email && (
            <p className="text-sm text-red-400 ml-1">{errors.email.message}</p>
          )}
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-300 font-medium ml-1">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="e.g., +1234567890"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.phone && (
            <p className="text-sm text-red-400 ml-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="joined_date" className="text-slate-300 font-medium ml-1">
            Joined Date
          </Label>
          <Input
            id="joined_date"
            type="date"
            {...register('joined_date')}
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.joined_date && (
            <p className="text-sm text-red-400 ml-1">{errors.joined_date.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="membership_plan_id" className="text-slate-300 font-medium ml-1">
            Membership Plan
          </Label>
          <select
            id="membership_plan_id"
            {...register('membership_plan_id')}
            className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12 px-3"
          >
            <option value="">Select a plan (optional)</option>
            {memberships?.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - ${plan.price} ({plan.duration_months} months)
              </option>
            ))}
          </select>
          {errors.membership_plan_id && (
            <p className="text-sm text-red-400 ml-1">{errors.membership_plan_id.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="trainer_id" className="text-slate-300 font-medium ml-1">
            Assigned Trainer
          </Label>
          <select
            id="trainer_id"
            {...register('trainer_id')}
            className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12 px-3"
            disabled={trainersLoading}
          >
            <option value="">
              {trainersLoading ? 'Loading trainers...' : 'Select a trainer (optional)'}
            </option>
            {!trainersLoading && trainers?.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name} {trainer.specialization ? `- ${trainer.specialization}` : ''}
              </option>
            ))}
          </select>
          {errors.trainer_id && (
            <p className="text-sm text-red-400 ml-1">{errors.trainer_id.message}</p>
          )}
        </div>
      </div>

      {/* Payment Status - Show only for new members */}
      {!initialData && (
        <div className="space-y-2">
          <Label htmlFor="payment_status" className="text-slate-300 font-medium ml-1">
            Payment Status
          </Label>
          <select
            id="payment_status"
            {...register('payment_status')}
            className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12 px-3"
          >
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </select>
          {(errors as FieldErrors<MemberFormData>).payment_status && (
            <p className="text-sm text-red-400 ml-1">{(errors as FieldErrors<MemberFormData>).payment_status?.message}</p>
          )}
        </div>
      )}

      {/* Show current payment status for existing members (read-only) */}
      {initialData && (
        <div className="space-y-2">
          <Label className="text-slate-300 font-medium ml-1">
            Current Payment Status
          </Label>
          <div className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 rounded-xl h-12 px-3 flex items-center">
            <span className="capitalize">{initialData.payments?.[0]?.status || 'unpaid'}</span>
          </div>
          <p className="text-xs text-slate-500 ml-1">Payment status cannot be edited here</p>
        </div>
      )}

      {/* Payment Details - Show only for new members when payment status is partial or paid and membership plan is selected */}
      {!initialData && selectedMembershipPlan && paymentStatus !== 'unpaid' && (
        <div className="space-y-6 p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <CreditCard className="text-orange-400 w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white">Payment Details</h3>
            <span className="text-sm text-slate-400">({selectedMembershipPlan.name})</span>
          </div>

            <div className="space-y-2">
              <Label htmlFor="payment_amount" className="text-slate-300 font-medium ml-1">
                Payment Amount ($)
              </Label>
              <Input
                id="payment_amount"
                type="number"
                step="0.01"
                {...register('payment_amount')}
                placeholder={selectedMembershipPlan.price.toString()}
                className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
              />
              {(errors as FieldErrors<MemberFormData>).payment_amount && (
                <p className="text-sm text-red-400 ml-1">{(errors as FieldErrors<MemberFormData>).payment_amount?.message}</p>
              )}
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="billing_start" className="text-slate-300 font-medium ml-1">
                Billing Start Date
              </Label>
              <Input
                id="billing_start"
                type="date"
                {...register('billing_start')}
                className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
              />
              {/* @ts-ignore */}
              {(errors as FieldErrors<MemberFormData>).billing_start && (
                <p className="text-sm text-red-400 ml-1">{(errors as FieldErrors<MemberFormData>).billing_start?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billing_end" className="text-slate-300 font-medium ml-1">
                Billing End Date
              </Label>
              <Input
                id="billing_end"
                type="date"
                {...register('billing_end')}
                className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
              />
              {/* @ts-ignore */}
              {(errors as FieldErrors<MemberFormData>).billing_end && (
                <p className="text-sm text-red-400 ml-1">{(errors as FieldErrors<MemberFormData>).billing_end?.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paid_date" className="text-slate-300 font-medium ml-1">
              Paid Date
            </Label>
            <Input
              id="paid_date"
              type="date"
              {...register('paid_date')}
              className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
            />
            {/* @ts-ignore */}
            {(errors as FieldErrors<MemberFormData>).paid_date && (
              <p className="text-sm text-red-400 ml-1">{(errors as FieldErrors<MemberFormData>).paid_date?.message}</p>
            )}
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {initialData ? 'Updating...' : 'Creating...'}
          </>
        ) : (
          <>{initialData ? 'Update Member' : 'Create Member'}</>
        )}
      </Button>
    </form>
  );
}
