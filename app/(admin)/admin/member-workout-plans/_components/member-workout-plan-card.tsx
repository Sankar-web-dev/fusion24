'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberWorkoutPlans, WorkoutPlans, WorkoutExercises } from '@/schema';
import { Edit, Trash2, Dumbbell, User, Calendar, Target } from 'lucide-react';

interface MemberWorkoutPlanCardProps {
  memberWorkoutPlan: MemberWorkoutPlans & { 
    member: { name: string; email: string }, 
    workout_plan: WorkoutPlans & { workout_exercises: WorkoutExercises[] } 
  };
  onEdit: (memberWorkoutPlan: MemberWorkoutPlans & { 
    member: { name: string; email: string }, 
    workout_plan: WorkoutPlans & { workout_exercises: WorkoutExercises[] } 
  }) => void;
  onDelete: (id: string) => void;
}

export function MemberWorkoutPlanCard({ memberWorkoutPlan, onEdit, onDelete }: MemberWorkoutPlanCardProps) {
  const exercises = memberWorkoutPlan.workout_plan.workout_exercises || [];
  const assignedDate = memberWorkoutPlan.assigned_date ? new Date(memberWorkoutPlan.assigned_date).toLocaleDateString() : 'N/A';
  
  const getDifficultyColor = (difficulty: string | null | undefined) => {
    switch (difficulty) {
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

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Dumbbell className="text-orange-400 w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{memberWorkoutPlan.workout_plan.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                  {memberWorkoutPlan.member.name}
                </Badge>
                {memberWorkoutPlan.workout_plan.difficulty && (
                  <Badge variant="secondary" className={getDifficultyColor(memberWorkoutPlan.workout_plan.difficulty)}>
                    {memberWorkoutPlan.workout_plan.difficulty}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(memberWorkoutPlan)}
              className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(memberWorkoutPlan.id)}
              className="bg-red-900/20 border-red-600/50 text-red-400 hover:bg-red-900/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {memberWorkoutPlan.workout_plan.description && (
          <p className="text-slate-400 text-sm">{memberWorkoutPlan.workout_plan.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>{memberWorkoutPlan.member.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-400" />
            <span>Assigned: {assignedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-400" />
            <span>{exercises.length} exercises</span>
          </div>
        </div>

        {/* {exercises.length > 0 && (
          <div className="mt-4">
            <h4 className="text-white font-medium mb-3">Exercises</h4>
            <div className="space-y-2">
              {exercises.slice(0, 3).map((exercise, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-200">{exercise.exercise_name}</span>
                    {exercise.sets && exercise.reps && (
                      <span className="text-slate-400">
                        {exercise.sets} × {exercise.reps}
                      </span>
                    )}
                  </div>
                  {exercise.rest_seconds && (
                    <span className="text-slate-400">
                      Rest: {exercise.rest_seconds}s
                    </span>
                  )}
                </div>
              ))}
              {exercises.length > 3 && (
                <div className="text-center text-sm text-slate-400 py-2">
                  +{exercises.length - 3} more exercises
                </div>
              )}
            </div>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}
