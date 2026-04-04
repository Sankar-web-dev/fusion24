'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberWorkoutPlanForm } from './_components/member-workout-plan-form';
import { WorkoutPlanForm } from './_components/workout-plan-form';
import { useGetMemberWorkoutPlans, useCreateMemberWorkoutPlan, useUpdateMemberWorkoutPlan, useDeleteMemberWorkoutPlan } from './_queries/member-workout-plan-query';
import { useGetWorkoutPlans, useCreateWorkoutPlan, useUpdateWorkoutPlan, useDeleteWorkoutPlan } from './_queries/workout-plan-query';
import { Calendar, User, Dumbbell, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MemberWorkoutPlansPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isWorkoutPlanDialogOpen, setIsWorkoutPlanDialogOpen] = useState(false);
  const [isWorkoutPlanEditDialogOpen, setIsWorkoutPlanEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const { data: memberWorkoutPlans, refetch } = useGetMemberWorkoutPlans();
  const { data: workoutPlans } = useGetWorkoutPlans();
  const { data: allWorkoutPlans } = useGetWorkoutPlans();

  const createMemberWorkoutPlanMutation = useCreateMemberWorkoutPlan();
  const updateMemberWorkoutPlanMutation = useUpdateMemberWorkoutPlan();
  const deleteMemberWorkoutPlanMutation = useDeleteMemberWorkoutPlan();

  const createWorkoutPlanMutation = useCreateWorkoutPlan();
  const updateWorkoutPlanMutation = useUpdateWorkoutPlan();
  const deleteWorkoutPlanMutation = useDeleteWorkoutPlan();

  const handleCreateMemberWorkoutPlan = async (data: any) => {
    try {
      await createMemberWorkoutPlanMutation.mutateAsync(data);
      toast.success('Workout plan assigned successfully');
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to assign workout plan');
    }
  };

  const handleUpdateMemberWorkoutPlan = async (data: any) => {
    try {
      await updateMemberWorkoutPlanMutation.mutateAsync({ id: selectedPlan.id, data });
      toast.success('Assignment updated successfully');
      setIsEditDialogOpen(false);
      setSelectedPlan(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update assignment');
    }
  };

  const handleDeleteMemberWorkoutPlan = async (id: string) => {
    try {
      await deleteMemberWorkoutPlanMutation.mutateAsync(id);
      toast.success('Assignment deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete assignment');
    }
  };

  const handleCreateWorkoutPlan = async (data: any) => {
    try {
      await createWorkoutPlanMutation.mutateAsync(data);
      toast.success('Workout plan created successfully');
      setIsWorkoutPlanDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create workout plan');
    }
  };

  const handleUpdateWorkoutPlan = async (data: any) => {
    try {
      await updateWorkoutPlanMutation.mutateAsync({ id: selectedPlan.id, data });
      toast.success('Workout plan updated successfully');
      setIsWorkoutPlanEditDialogOpen(false);
      setSelectedPlan(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update workout plan');
    }
  };

  const handleDeleteWorkoutPlan = async (id: string) => {
    try {
      await deleteWorkoutPlanMutation.mutateAsync(id);
      toast.success('Workout plan deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete workout plan');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Workout Plans</h1>
          <p className="text-slate-400 mt-2">Manage workout plans and member assignments</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsWorkoutPlanDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold"
          >
            <Dumbbell className="w-4 h-4 mr-2" />
            Create Workout Plan
          </Button>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Assign Plan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="assignments" className="text-slate-300">Member Assignments</TabsTrigger>
          <TabsTrigger value="plans" className="text-slate-300">Workout Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4">
            {memberWorkoutPlans?.map((assignment) => (
              <Card key={assignment.id} className="bg-slate-900/50 border-slate-700/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                        <User className="text-orange-400 w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{assignment.member.name}</CardTitle>
                        <p className="text-slate-400 text-sm">{assignment.member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPlan(assignment);
                          setIsEditDialogOpen(true);
                        }}
                        className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-900/20 border-red-600/50 text-red-400 hover:bg-red-900/30"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-900 border-slate-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              This will remove the workout plan assignment from {assignment.member.name}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-800 text-slate-200">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteMemberWorkoutPlan(assignment.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-medium">{assignment.workout_plan.name}</span>
                      {assignment.workout_plan.difficulty && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                          {assignment.workout_plan.difficulty}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-400" />
                      <span className="text-slate-300">
                        Assigned: {assignment.assigned_date ? new Date(assignment.assigned_date).toLocaleDateString() : 'Not set'}
                      </span>
                    </div>
                  </div>
                  {assignment.workout_plan.description && (
                    <p className="text-slate-400 text-sm">{assignment.workout_plan.description}</p>
                  )}
                  {assignment.workout_plan.exercises && assignment.workout_plan.exercises.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-white font-medium mb-2">Exercises ({assignment.workout_plan.exercises.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {assignment.workout_plan.exercises.map((exercise, index) => (
                          <div key={index} className="text-sm text-slate-300 bg-slate-800/50 p-2 rounded">
                            <span className="font-medium">{exercise.exercise_name}</span>
                            {exercise.sets && exercise.reps && (
                              <span className="text-slate-400 ml-2">
                                {exercise.sets} sets × {exercise.reps} reps
                              </span>
                            )}
                            {exercise.rest_seconds && (
                              <span className="text-slate-400 ml-2">
                                Rest: {exercise.rest_seconds}s
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4">
            {allWorkoutPlans?.map((plan) => (
              <Card key={plan.id} className="bg-slate-900/50 border-slate-700/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Dumbbell className="text-blue-400 w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{plan.name}</CardTitle>
                        {plan.difficulty && (
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/50 mt-1">
                            {plan.difficulty}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPlan(plan);
                          setIsWorkoutPlanEditDialogOpen(true);
                        }}
                        className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-900/20 border-red-600/50 text-red-400 hover:bg-red-900/30"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-900 border-slate-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              This will delete the workout plan "{plan.name}" and all its exercises. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-800 text-slate-200">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteWorkoutPlan(plan.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.description && (
                    <p className="text-slate-400">{plan.description}</p>
                  )}
                  {plan.exercises && plan.exercises.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Exercises ({plan.exercises.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {plan.exercises.map((exercise, index) => (
                          <div key={index} className="text-sm text-slate-300 bg-slate-800/50 p-2 rounded">
                            <span className="font-medium">{exercise.exercise_name}</span>
                            {exercise.sets && exercise.reps && (
                              <span className="text-slate-400 ml-2">
                                {exercise.sets} sets × {exercise.reps} reps
                              </span>
                            )}
                            {exercise.rest_seconds && (
                              <span className="text-slate-400 ml-2">
                                Rest: {exercise.rest_seconds}s
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Assignment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Assign Workout Plan</DialogTitle>
            <DialogDescription className="text-slate-400">
              Assign a workout plan to a member
            </DialogDescription>
          </DialogHeader>
          <MemberWorkoutPlanForm onSubmit={handleCreateMemberWorkoutPlan} isLoading={createMemberWorkoutPlanMutation.isPending} />
        </DialogContent>
      </Dialog>

      {/* Edit Assignment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Assignment</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update the workout plan assignment
            </DialogDescription>
          </DialogHeader>
          {selectedPlan && (
            <MemberWorkoutPlanForm
              initialData={selectedPlan}
              onSubmit={handleUpdateMemberWorkoutPlan}
              isLoading={updateMemberWorkoutPlanMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Create Workout Plan Dialog */}
      <Dialog open={isWorkoutPlanDialogOpen} onOpenChange={setIsWorkoutPlanDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Create Workout Plan</DialogTitle>
            <DialogDescription className="text-slate-400">
              Create a new workout plan with exercises
            </DialogDescription>
          </DialogHeader>
          <WorkoutPlanForm onSubmit={handleCreateWorkoutPlan} isLoading={createWorkoutPlanMutation.isPending} />
        </DialogContent>
      </Dialog>

      {/* Edit Workout Plan Dialog */}
      <Dialog open={isWorkoutPlanEditDialogOpen} onOpenChange={setIsWorkoutPlanEditDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Workout Plan</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update the workout plan and exercises
            </DialogDescription>
          </DialogHeader>
          {selectedPlan && (
            <WorkoutPlanForm
              initialData={selectedPlan}
              onSubmit={handleUpdateWorkoutPlan}
              isLoading={updateWorkoutPlanMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
