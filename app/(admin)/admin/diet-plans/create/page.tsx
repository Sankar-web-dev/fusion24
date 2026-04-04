'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Utensils } from 'lucide-react';
import { DietPlanForm } from '../_components/diet-plan-form';
import { useCreateDietPlan } from '../_queries/diet-plan-query';
import { toast } from 'sonner';

export default function CreateDietPlanPage() {
  const router = useRouter();
  const createDietPlanMutation = useCreateDietPlan();

  const handleCreateDietPlan = async (data: any) => {
    try {
      await createDietPlanMutation.mutateAsync(data);
      toast.success('Diet plan created successfully');
      router.push('/admin/diet-plans');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create diet plan');
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
          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
            <Utensils className="text-green-400 w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Create Diet Plan</h1>
            <p className="text-slate-400 mt-1">Create a new diet plan with meals</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <DietPlanForm onSubmit={handleCreateDietPlan} isLoading={createDietPlanMutation.isPending} />
      </div>
    </div>
  );
}
