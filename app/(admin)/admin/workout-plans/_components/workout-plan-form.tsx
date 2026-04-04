'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WorkoutPlanFormData, WorkoutPlanUpdateFormData, workoutPlanSchema, workoutPlanUpdateSchema } from '../validations/workout-plan.validation';
import { Plus, Trash2, Loader2 } from 'lucide-react';

interface WorkoutPlanFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function WorkoutPlanForm({ initialData, onSubmit, isLoading }: WorkoutPlanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<WorkoutPlanFormData | WorkoutPlanUpdateFormData>({
    resolver: zodResolver(initialData ? workoutPlanUpdateSchema : workoutPlanSchema),
    defaultValues: initialData
      ? {
          name: initialData.name || '',
          difficulty: initialData.difficulty || '',
          description: initialData.description || '',
          exercises: initialData.exercises || [],
        }
      : {
          name: '',
          difficulty: '',
          description: '',
          exercises: [{ exercise_name: '', sets: 3, reps: 10, rest_seconds: 60 }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises' as any,
  });

  useEffect(() => {
    if (initialData) {
      console.log('Initial data:', initialData);
      console.log('Initial data workout_exercises:', initialData.workout_exercises);
      
      // The exercises come as 'workout_exercises' from the database query
      const exercisesData = initialData.workout_exercises || initialData.exercises || [];
      
      // Ensure exercises are properly formatted
      const formattedExercises = exercisesData && exercisesData.length > 0 
        ? exercisesData.map((exercise: any) => ({
            exercise_name: exercise.exercise_name || '',
            sets: exercise.sets || 3,
            reps: exercise.reps || 10,
            rest_seconds: exercise.rest_seconds || 60,
          }))
        : [{ exercise_name: '', sets: 3, reps: 10, rest_seconds: 60 }];
      
      console.log('Formatted exercises:', formattedExercises);
      
      // Reset the entire form with initial data including exercises
      reset({
        name: initialData.name || '',
        difficulty: initialData.difficulty || '',
        description: initialData.description || '',
        exercises: formattedExercises,
      });
    }
  }, [initialData, reset]);

  // Debug: Log fields to see if exercises are being tracked
  useEffect(() => {
    console.log('Current fields:', fields);
    console.log('Current form values:', control._formValues);
  }, [fields, control._formValues]);

  const addExercise = () => {
    append({ exercise_name: '', sets: 3, reps: 10, rest_seconds: 60 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-300 font-medium ml-1">
          Workout Plan Name <span className="text-orange-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="e.g., Beginner Full Body"
          className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
        />
        {errors.name && (
          <p className="text-sm text-red-400 ml-1">{(errors.name as any).message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="difficulty" className="text-slate-300 font-medium ml-1">
            Difficulty
          </Label>
          <select
            id="difficulty"
            {...register('difficulty')}
            className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12 px-3"
          >
            <option value="">Select difficulty</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.difficulty && (
            <p className="text-sm text-red-400 ml-1">{(errors.difficulty as any).message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-slate-300 font-medium ml-1">
            Description
          </Label>
          <Input
            id="description"
            {...register('description')}
            placeholder="Optional description"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.description && (
            <p className="text-sm text-red-400 ml-1">{(errors.description as any).message}</p>
          )}
        </div>
      </div>

      {/* Exercises Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Exercises</h3>
          <Button
            type="button"
            onClick={addExercise}
            variant="outline"
            className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Exercise
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium ml-1 text-sm">
                    Exercise Name <span className="text-orange-500">*</span>
                  </Label>
                  <Input
                    {...register(`exercises.${index}.exercise_name` as any)}
                    placeholder="e.g., Bench Press"
                    className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-10"
                  />
                  {(errors as any)?.exercises?.[index]?.exercise_name && (
                    <p className="text-sm text-red-400 ml-1">
                      {(errors as any).exercises[index].exercise_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium ml-1 text-sm">Sets</Label>
                  <Input
                    type="number"
                    {...register(`exercises.${index}.sets` as any, { valueAsNumber: true })}
                    placeholder="3"
                    className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium ml-1 text-sm">Reps</Label>
                  <Input
                    type="number"
                    {...register(`exercises.${index}.reps` as any, { valueAsNumber: true })}
                    placeholder="10"
                    className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium ml-1 text-sm">Rest (seconds)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      {...register(`exercises.${index}.rest_seconds` as any, { valueAsNumber: true })}
                      placeholder="60"
                      className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-10"
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="outline"
                        className="bg-red-900/20 border-red-600/50 text-red-400 hover:bg-red-900/30 px-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0 mt-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {initialData ? 'Updating...' : 'Creating...'}
          </>
        ) : (
          <>{initialData ? 'Update Workout Plan' : 'Create Workout Plan'}</>
        )}
      </Button>
    </form>
  );
}
