'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DietPlanCard } from './_components/diet-plan-card';
import { useGetDietPlans, useDeleteDietPlan } from './_queries/diet-plan-query';
import { Plus, Utensils, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { DietPlans, DietMeals } from '@/schema';

export default function DietPlansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const { data: dietPlans, isLoading } = useGetDietPlans();
  const deleteDietPlanMutation = useDeleteDietPlan();

  const handleDeleteDietPlan = async (id: string) => {
    try {
      await deleteDietPlanMutation.mutateAsync(id);
      toast.success('Diet plan deleted successfully');
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete diet plan');
    }
  };

  const handleDeleteClick = (id: string) => {
    setPlanToDelete(id);
    setDeleteDialogOpen(true);
  };

  const filteredDietPlans = dietPlans?.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.meals?.some(meal => 
      meal.food_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.meal_type?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Diet Plans</h1>
          <p className="text-slate-400 mt-2">Create and manage diet plans with meals</p>
        </div>
        <Link href="/admin/diet-plans/create">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Create Diet Plan
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search diet plans, meals, food names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
        />
      </div>

      {/* Diet Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDietPlans.map((dietPlan) => (
          <DietPlanCard
            key={dietPlan.id}
            dietPlan={dietPlan}
            onEdit={(dietPlan) => {
              // Navigate to edit page
              window.location.href = `/admin/diet-plans/${dietPlan.id}/edit`;
            }}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && filteredDietPlans.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchTerm ? 'No diet plans found' : 'No diet plans yet'}
          </h3>
          <p className="text-slate-400 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Create your first diet plan to get started'
            }
          </p>
          {!searchTerm && (
            <Link href="/admin/diet-plans/create">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Create Diet Plan
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This will permanently delete the diet plan and all its meals. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => planToDelete && handleDeleteDietPlan(planToDelete)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
