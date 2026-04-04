'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemberWorkoutPlanFormData, memberWorkoutPlanSchema } from '../validations/member-workout-plan.validation';
import { useGetMembers } from '../../members/_query/member-query';
import { useGetWorkoutPlans } from '../../workout-plans/_queries/workout-plan-query';
import { Loader2 } from 'lucide-react';

interface MemberWorkoutPlanFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function MemberWorkoutPlanForm({ onSubmit, isLoading }: MemberWorkoutPlanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MemberWorkoutPlanFormData>({
    resolver: zodResolver(memberWorkoutPlanSchema),
  });

  const { data: members, isLoading: membersLoading } = useGetMembers();
  const { data: workoutPlans, isLoading: workoutPlansLoading } = useGetWorkoutPlans();

  const selectedMemberId = watch('member_id');
  const selectedWorkoutPlanId = watch('workout_plan_id');

  const selectedMember = members?.find(m => m.id === selectedMemberId);
  const selectedWorkoutPlan = workoutPlans?.find(wp => wp.id === selectedWorkoutPlanId);

  if (membersLoading || workoutPlansLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-400 mx-auto mb-4" />
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
            Member <span className="text-orange-500">*</span>
          </Label>
          <select
            id="member_id"
            {...register('member_id')}
            className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12 px-3"
          >
            <option value="">Select a member</option>
            {members?.map((member: any) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.email}
              </option>
            ))}
          </select>
          {errors.member_id && (
            <p className="text-sm text-red-400 ml-1">{errors.member_id.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="workout_plan_id" className="text-slate-300 font-medium ml-1">
            Workout Plan <span className="text-orange-500">*</span>
          </Label>
          <select
            id="workout_plan_id"
            {...register('workout_plan_id')}
            className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12 px-3"
          >
            <option value="">Select a workout plan</option>
            {workoutPlans?.map((workoutPlan) => (
              <option key={workoutPlan.id} value={workoutPlan.id}>
                {workoutPlan.name} {workoutPlan.difficulty && `(${workoutPlan.difficulty})`}
              </option>
            ))}
          </select>
          {errors.workout_plan_id && (
            <p className="text-sm text-red-400 ml-1">{errors.workout_plan_id.message}</p>
          )}
        </div>
      </div>

      {/* Preview Section */}
      {selectedWorkoutPlan && (
        <div className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Assignment Preview</h3>
          
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-2">Workout Plan Details</h4>
            <div className="space-y-1">
              <p className="text-slate-200"><span className="font-medium">Plan:</span> {selectedWorkoutPlan.name}</p>
              <p className="text-slate-200"><span className="font-medium">Difficulty:</span> {selectedWorkoutPlan.difficulty || 'N/A'}</p>
              <p className="text-slate-200"><span className="font-medium">Exercises:</span> {selectedWorkoutPlan.workout_exercises?.length || selectedWorkoutPlan.exercises?.length || 0} exercises</p>
              {selectedWorkoutPlan.description && (
                <p className="text-slate-200"><span className="font-medium">Description:</span> {selectedWorkoutPlan.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading || !selectedMemberId || !selectedWorkoutPlanId}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0 mt-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Assigning Workout Plan...
          </>
        ) : (
          <>Assign Workout Plan</>
        )}
      </Button>
    </form>
  );
}
