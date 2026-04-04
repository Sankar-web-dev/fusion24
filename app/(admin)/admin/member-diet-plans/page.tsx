'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MemberDietPlanCard } from './_components/member-diet-plan-card';
import { useGetMemberDietPlans, useDeleteMemberDietPlan } from './_queries/member-diet-plan-query';
import { Plus, Utensils, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function MemberDietPlansPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const { data: memberDietPlans, isLoading } = useGetMemberDietPlans();
  const deleteMemberDietPlanMutation = useDeleteMemberDietPlan();

  const handleDeleteMemberDietPlan = async (id: string) => {
    try {
      await deleteMemberDietPlanMutation.mutateAsync(id);
      toast.success('Diet plan assignment deleted successfully');
      setDeleteDialogOpen(false);
      setAssignmentToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete diet plan assignment');
    }
  };

  const handleDeleteClick = (id: string) => {
    setAssignmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const filteredAssignments = memberDietPlans?.filter(assignment =>
    assignment.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.diet_plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.diet_plan.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.diet_plan.diet_meals?.some(meal => 
      meal.food_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.meal_type?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Diet Plan Assignments</h1>
          <p className="text-slate-400 mt-2">Manage diet plan assignments to members</p>
        </div>
        <Link href="/admin/member-diet-plans/create">
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Assign Diet Plan
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search assignments, members, diet plans, meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-green-500 focus-visible:border-green-500 rounded-xl h-12"
        />
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.map((memberDietPlan) => (
          <MemberDietPlanCard
            key={memberDietPlan.id}
            memberDietPlan={memberDietPlan}
            onEdit={(memberDietPlan) => {
              router.push(`/admin/member-diet-plans/${memberDietPlan.id}/edit`);
            }}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchTerm ? 'No assignments found' : 'No diet plan assignments yet'}
          </h3>
          <p className="text-slate-400 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Assign your first diet plan to a member to get started'
            }
          </p>
          {!searchTerm && (
            <Link href="/admin/member-diet-plans/create">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Assign Diet Plan
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
              This will permanently delete the diet plan assignment. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => assignmentToDelete && handleDeleteMemberDietPlan(assignmentToDelete)}
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
