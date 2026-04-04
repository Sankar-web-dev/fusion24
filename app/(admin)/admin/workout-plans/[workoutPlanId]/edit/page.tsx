'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import { WorkoutPlanForm } from '../../_components/workout-plan-form';
import { useGetWorkoutPlan, useUpdateWorkoutPlan } from '../../_queries/workout-plan-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function EditWorkoutPlanPage({ params }: { params: Promise<{ workoutPlanId: string }> }) {
  const router = useRouter();
  const { workoutPlanId } = React.use(params);
  const { data: workoutPlan, isLoading } = useGetWorkoutPlan(workoutPlanId);
  const updateWorkoutPlanMutation = useUpdateWorkoutPlan();

  const handleUpdateWorkoutPlan = async (data: any) => {
    try {
      await updateWorkoutPlanMutation.mutateAsync({ id: workoutPlanId, data });
      toast.success('Workout plan updated successfully');
      router.push('/admin/workout-plans');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update workout plan');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-400 mx-auto mb-4" />
            <p className="text-slate-400">Loading workout plan...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!workoutPlan) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">Workout Plan Not Found</h1>
          <p className="text-slate-400 mb-6">The workout plan you're looking for doesn't exist.</p>
          <Button
            onClick={() => router.push('/admin/workout-plans')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold"
          >
            Go Back to Workout Plans
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
            <Dumbbell className="text-orange-400 w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Workout Plan</h1>
            <p className="text-slate-400 mt-1">Update workout plan and exercises</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <WorkoutPlanForm
          initialData={workoutPlan}
          onSubmit={handleUpdateWorkoutPlan}
          isLoading={updateWorkoutPlanMutation.isPending}
        />
      </div>
    </div>
  );
}
