'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MemberWorkoutPlanCard } from './_components/member-workout-plan-card';
import { useGetMemberWorkoutPlans, useDeleteMemberWorkoutPlan } from './_queries/member-workout-plan-query';
import { Plus, Dumbbell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function MemberWorkoutPlansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const { data: memberWorkoutPlans, isLoading } = useGetMemberWorkoutPlans();
  const deleteMemberWorkoutPlanMutation = useDeleteMemberWorkoutPlan();

  const handleDeleteMemberWorkoutPlan = async (id: string) => {
    try {
      await deleteMemberWorkoutPlanMutation.mutateAsync(id);
      toast.success('Workout plan assignment deleted successfully');
      setDeleteDialogOpen(false);
      setAssignmentToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete workout plan assignment');
    }
  };

  const handleDeleteClick = (id: string) => {
    setAssignmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const filteredAssignments = memberWorkoutPlans?.filter(assignment =>
    assignment.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.workout_plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.workout_plan.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.workout_plan.difficulty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.workout_plan.exercises?.some(exercise => 
      exercise.exercise_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Workout Plan Assignments</h1>
          <p className="text-slate-400 mt-2">Manage workout plan assignments to members</p>
        </div>
        <Link href="/admin/member-workout-plans/create">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Assign Workout Plan
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search assignments, members, workout plans, exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
        />
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.map((memberWorkoutPlan) => (
          <MemberWorkoutPlanCard
            key={memberWorkoutPlan.id}
            memberWorkoutPlan={memberWorkoutPlan}
            onEdit={(memberWorkoutPlan) => {
              // For now, just show a toast. Edit functionality can be added later.
              toast.info('Edit functionality coming soon');
            }}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchTerm ? 'No assignments found' : 'No workout plan assignments yet'}
          </h3>
          <p className="text-slate-400 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Assign your first workout plan to a member to get started'
            }
          </p>
          {!searchTerm && (
            <Link href="/admin/member-workout-plans/create">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Assign Workout Plan
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
              This will permanently delete the workout plan assignment. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => assignmentToDelete && handleDeleteMemberWorkoutPlan(assignmentToDelete)}
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
