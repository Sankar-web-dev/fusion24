'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemberWorkoutPlanFormData, MemberWorkoutPlanUpdateFormData } from '../validations/member-workout-plan.validation';
import { memberWorkoutPlanService } from '@/service/member-workout-plan.service';
import { memberService } from '@/service/member.service';
import { workoutPlanService } from '@/service/workout-plan.service';
import { Members } from '@/schema';
import { WorkoutPlans } from '@/schema';
import { Loader2 } from 'lucide-react';

interface MemberWorkoutPlanFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function MemberWorkoutPlanForm({ initialData, onSubmit, isLoading }: MemberWorkoutPlanFormProps) {
  const [members, setMembers] = useState<Members[]>([]);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlans[]>([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [workoutPlansLoading, setWorkoutPlansLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setMembersLoading(true);
      setWorkoutPlansLoading(true);
      
      try {
        const [membersData, workoutPlansData] = await Promise.all([
          memberService.getAllMembers(),
          workoutPlanService.getAllWorkoutPlans(),
        ]);
        
        setMembers(membersData);
        setWorkoutPlans(workoutPlansData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setMembersLoading(false);
        setWorkoutPlansLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MemberWorkoutPlanFormData | MemberWorkoutPlanUpdateFormData>({
    resolver: zodResolver(initialData ? undefined : require('../validations/member-workout-plan.validation').memberWorkoutPlanSchema),
    defaultValues: initialData
      ? {
          member_id: initialData.member_id || '',
          workout_plan_id: initialData.workout_plan_id || '',
          assigned_date: initialData.assigned_date 
            ? new Date(initialData.assigned_date).toISOString().split('T')[0] 
            : new Date().toISOString().split('T')[0],
        }
      : {
          member_id: '',
          workout_plan_id: '',
          assigned_date: new Date().toISOString().split('T')[0],
        },
  });

  // Update form values when data is loaded and we have initial data
  useEffect(() => {
    if (initialData && !membersLoading && !workoutPlansLoading) {
      setValue('member_id', initialData.member_id || '');
      setValue('workout_plan_id', initialData.workout_plan_id || '');
    }
  }, [initialData, membersLoading, workoutPlansLoading, setValue]);

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
            disabled={membersLoading}
          >
            <option value="">
              {membersLoading ? 'Loading members...' : 'Select a member'}
            </option>
            {!membersLoading && members?.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.email}
              </option>
            ))}
          </select>
          {errors.member_id && (
            <p className="text-sm text-red-400 ml-1">{(errors.member_id as any).message}</p>
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
            disabled={workoutPlansLoading}
          >
            <option value="">
              {workoutPlansLoading ? 'Loading workout plans...' : 'Select a workout plan'}
            </option>
            {!workoutPlansLoading && workoutPlans?.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} {plan.difficulty ? `(${plan.difficulty})` : ''}
              </option>
            ))}
          </select>
          {errors.workout_plan_id && (
            <p className="text-sm text-red-400 ml-1">{(errors.workout_plan_id as any).message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="assigned_date" className="text-slate-300 font-medium ml-1">
          Assigned Date
        </Label>
        <Input
          id="assigned_date"
          type="date"
          {...register('assigned_date')}
          className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
        />
        {errors.assigned_date && (
          <p className="text-sm text-red-400 ml-1">{(errors.assigned_date as any).message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || membersLoading || workoutPlansLoading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0 mt-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {initialData ? 'Updating...' : 'Assigning...'}
          </>
        ) : (
          <>{initialData ? 'Update Assignment' : 'Assign Workout Plan'}</>
        )}
      </Button>
    </form>
  );
}
