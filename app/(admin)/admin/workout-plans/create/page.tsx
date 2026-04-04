'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import { WorkoutPlanForm } from '../_components/workout-plan-form';
import { useCreateWorkoutPlan } from '../_queries/workout-plan-query';
import { toast } from 'sonner';

export default function CreateWorkoutPlanPage() {
  const router = useRouter();
  const createWorkoutPlanMutation = useCreateWorkoutPlan();

  const handleCreateWorkoutPlan = async (data: any) => {
    try {
      await createWorkoutPlanMutation.mutateAsync(data);
      toast.success('Workout plan created successfully');
      router.push('/admin/workout-plans');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create workout plan');
    }
  };

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
            <h1 className="text-3xl font-bold text-white">Create Workout Plan</h1>
            <p className="text-slate-400 mt-1">Create a new workout plan with exercises</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <WorkoutPlanForm onSubmit={handleCreateWorkoutPlan} isLoading={createWorkoutPlanMutation.isPending} />
      </div>
    </div>
  );
}
