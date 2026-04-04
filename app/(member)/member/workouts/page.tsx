'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberWorkoutPlans, WorkoutPlans, WorkoutExercises } from '@/schema';
import { Dumbbell, Clock, Calendar, TrendingUp, ChevronDown, ChevronUp, Target, Loader2 } from 'lucide-react';
import { useMemberWorkoutPlans } from './_hooks/use-member-workout-plans';

interface MemberWorkoutPlansWithDetails extends MemberWorkoutPlans {
  workout_plan: WorkoutPlans & { workout_exercises: WorkoutExercises[] };
}

export default function MemberWorkoutsPage() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const { data: memberWorkoutPlans = [], isLoading, error } = useMemberWorkoutPlans();

  const getDifficultyColor = (difficulty: string | null) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const togglePlanExpansion = (planId: string) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Workout Plans</h1>
        <p className="text-slate-400">View your assigned workout plans and exercise details</p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
            <p className="text-slate-400">Loading workout plans...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <p className="text-red-400 mb-2">Error loading workout plans</p>
            <p className="text-slate-400 text-sm">
              {error instanceof Error ? error.message : 'Unable to load your workout plans. Please contact support.'}
            </p>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6">
        {memberWorkoutPlans.map((memberWorkoutPlan) => (
          <Card key={memberWorkoutPlan.id} className="bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50 transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Dumbbell className="text-green-400 w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">
                      {memberWorkoutPlan.workout_plan.name}
                    </CardTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge 
                        variant="secondary" 
                        className={getDifficultyColor(memberWorkoutPlan.workout_plan.difficulty)}
                      >
                        {memberWorkoutPlan.workout_plan.difficulty || 'Not Specified'}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Assigned: {memberWorkoutPlan.assigned_date 
                            ? new Date(memberWorkoutPlan.assigned_date).toLocaleDateString()
                            : 'N/A'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePlanExpansion(memberWorkoutPlan.id)}
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  {expandedPlan === memberWorkoutPlan.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {memberWorkoutPlan.workout_plan.description && (
                <p className="text-slate-300 text-sm">
                  {memberWorkoutPlan.workout_plan.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span>{memberWorkoutPlan.workout_plan.workout_exercises.length} exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>
                    {memberWorkoutPlan.workout_plan.workout_exercises.reduce(
                      (total, exercise) => total + (exercise.sets || 0) * ((exercise.rest_seconds || 0) / 60), 
                      0
                    ).toFixed(0)} min estimated
                  </span>
                </div>
              </div>

              {expandedPlan === memberWorkoutPlan.id && (
                <div className="mt-6 space-y-4 border-t border-slate-700/50 pt-6">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-green-400" />
                    Exercise Details
                  </h4>
                  
                  <div className="grid gap-4">
                    {memberWorkoutPlan.workout_plan.workout_exercises.map((exercise, index) => (
                      <div 
                        key={exercise.id} 
                        className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-green-400">
                              {index + 1}
                            </div>
                            <div>
                              <h5 className="text-white font-medium">{exercise.exercise_name}</h5>
                              <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Target className="w-3 h-3" />
                                  {exercise.sets} sets
                                </span>
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {exercise.reps} reps
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {exercise.rest_seconds}s rest
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {!isLoading && !error && memberWorkoutPlans.length === 0 && (
        <div className="text-center py-12">
          <Dumbbell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Workout Plans Assigned</h3>
          <p className="text-slate-400">
            You don't have any workout plans assigned yet. Contact your trainer to get started.
          </p>
        </div>
      )}
    </div>
  );
}
