'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkoutPlans, WorkoutExercises } from '@/schema';
import { Edit, Trash2, Dumbbell, Clock, Target } from 'lucide-react';

interface WorkoutPlanCardProps {
  workoutPlan: WorkoutPlans & { exercises?: WorkoutExercises[]; workout_exercises?: WorkoutExercises[] };
  onEdit: (workoutPlan: WorkoutPlans & { exercises?: WorkoutExercises[]; workout_exercises?: WorkoutExercises[] }) => void;
  onDelete: (id: string) => void;
}

export function WorkoutPlanCard({ workoutPlan, onEdit, onDelete }: WorkoutPlanCardProps) {
  // Get exercises from either property (workout_exercises from DB, exercises from form)
  const exercises = workoutPlan.workout_exercises || workoutPlan.exercises || [];
  
  const getDifficultyColor = (difficulty: string | null) => {
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
              <CardTitle className="text-white text-lg">{workoutPlan.name}</CardTitle>
              {workoutPlan.difficulty && (
                <Badge variant="secondary" className={`mt-1 ${getDifficultyColor(workoutPlan.difficulty)}`}>
                  {workoutPlan.difficulty}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(workoutPlan)}
              className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(workoutPlan.id)}
              className="bg-red-900/20 border-red-600/50 text-red-400 hover:bg-red-900/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {workoutPlan.description && (
          <p className="text-slate-400 text-sm">{workoutPlan.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span>{exercises.length} exercises</span>
          </div>
          {/* {exercises.length > 0 && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span>
                {exercises.reduce((total, exercise) => {
                  const sets = exercise.sets || 1;
                  const reps = exercise.reps || 1;
                  const rest = exercise.rest_seconds || 0;
                  return total + (sets * rest);
                }, 0)}s rest total
              </span>
            </div>
          )} */}
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
