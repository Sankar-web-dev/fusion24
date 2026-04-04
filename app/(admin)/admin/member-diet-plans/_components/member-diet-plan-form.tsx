'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useGetMembers } from '../../members/_query/member-query';
import { useGetDietPlans } from '../../diet-plans/_queries/diet-plan-query';
import { supabase } from '@/lib/supabase';

interface MemberDietPlanFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function MemberDietPlanForm({ onSubmit, isLoading }: MemberDietPlanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      member_id: '',
      diet_plan_id: '',
      assigned_date: new Date().toISOString().split('T')[0]
    }
  });

  const { data: members, isLoading: membersLoading } = useGetMembers();
  const { data: dietPlans, isLoading: dietPlansLoading } = useGetDietPlans();

  const selectedMemberId = watch('member_id');
  const selectedDietPlanId = watch('diet_plan_id');

  const selectedMember = members?.find(m => m.id === selectedMemberId);
  const selectedDietPlan = dietPlans?.find(dp => dp.id === selectedDietPlanId);

  if (membersLoading || dietPlansLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="member_id" className="text-slate-300 font-medium ml-1">
            Member <span className="text-green-500">*</span>
          </Label>
          <select
            id="member_id"
            {...register('member_id', { required: 'Please select a member' })}
            className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500 rounded-xl h-12 px-3"
          >
            <option value="">Select a member</option>
            {members?.map((member: any) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.email}
              </option>
            ))}
          </select>
          {errors.member_id && (
            <p className="text-sm text-red-400 ml-1">{errors.member_id.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="diet_plan_id" className="text-slate-300 font-medium ml-1">
            Diet Plan <span className="text-green-500">*</span>
          </Label>
          <select
            id="diet_plan_id"
            {...register('diet_plan_id', { required: 'Please select a diet plan' })}
            className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500 rounded-xl h-12 px-3"
          >
            <option value="">Select a diet plan</option>
            {dietPlans?.map((dietPlan) => (
              <option key={dietPlan.id} value={dietPlan.id}>
                {dietPlan.name}
              </option>
            ))}
          </select>
          {errors.diet_plan_id && (
            <p className="text-sm text-red-400 ml-1">{errors.diet_plan_id.message as string}</p>
          )}
        </div>
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="assigned_date" className="text-slate-300 font-medium ml-1">
          Assigned Date <span className="text-green-500">*</span>
        </Label>
        <Input
          id="assigned_date"
          type="date"
          {...register('assigned_date', { required: 'Please select an assigned date' })}
          className="bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500 rounded-xl h-12 px-3"
        />
        {errors.assigned_date && (
          <p className="text-sm text-red-400 ml-1">{errors.assigned_date.message as string}</p>
        )}
      </div> */}

      {/* Preview Section */}
      {selectedDietPlan && (
        <div className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Assignment Preview</h3>
          
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-2">Diet Plan Details</h4>
            <div className="space-y-1">
              <p className="text-slate-200"><span className="font-medium">Plan:</span> {selectedDietPlan.name}</p>
              <p className="text-slate-200"><span className="font-medium">Meals:</span> {selectedDietPlan.meals?.length || 0} meals</p>
              {selectedDietPlan.description && (
                <p className="text-slate-200"><span className="font-medium">Description:</span> {selectedDietPlan.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading || !selectedMemberId || !selectedDietPlanId}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] border-0 mt-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Assigning Diet Plan...
          </>
        ) : (
          <>Assign Diet Plan</>
        )}
      </Button>
    </form>
  );
}
