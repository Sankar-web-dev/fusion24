'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DietPlanFormData, DietPlanUpdateFormData, dietPlanSchema, dietPlanUpdateSchema } from '../validations/diet-plan.validation';
import { Plus, Trash2, Loader2 } from 'lucide-react';

interface DietPlanFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function DietPlanForm({ initialData, onSubmit, isLoading }: DietPlanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<DietPlanFormData | DietPlanUpdateFormData>({
    resolver: zodResolver(initialData ? dietPlanUpdateSchema : dietPlanSchema),
    defaultValues: initialData
      ? {
          name: initialData.name || '',
          description: initialData.description || '',
          meals: initialData.diet_meals || initialData.meals || [],
        }
      : {
          name: '',
          description: '',
          meals: [{ meal_type: '', food_name: '', calories: 0 }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meals' as any,
  });

  useEffect(() => {
    if (initialData) {
      console.log('Initial data:', initialData);
      console.log('Initial data diet_meals:', initialData.diet_meals);
      
      // The meals come as 'diet_meals' from the database query
      const mealsData = initialData.diet_meals || initialData.meals || [];
      
      // Ensure meals are properly formatted
      const formattedMeals = mealsData && mealsData.length > 0 
        ? mealsData.map((meal: any) => ({
            meal_type: meal.meal_type || '',
            food_name: meal.food_name || '',
            calories: meal.calories || 0,
          }))
        : [{ meal_type: '', food_name: '', calories: 0 }];
      
      console.log('Formatted meals:', formattedMeals);
      
      // Reset the entire form with initial data including meals
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        meals: formattedMeals,
      });
    }
  }, [initialData, reset]);

  // Debug: Log fields to see if meals are being tracked
  useEffect(() => {
    console.log('Current fields:', fields);
    console.log('Current form values:', control._formValues);
  }, [fields, control._formValues]);

  const addMeal = () => {
    append({ meal_type: '', food_name: '', calories: 0 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-300 font-medium ml-1">
          Diet Plan Name <span className="text-orange-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="e.g., Weight Loss Plan"
          className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
        />
        {errors.name && (
          <p className="text-sm text-red-400 ml-1">{(errors.name as any).message}</p>
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

      {/* Meals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Meals</h3>
          <Button
            type="button"
            onClick={addMeal}
            variant="outline"
            className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium ml-1 text-sm">
                    Meal Type <span className="text-orange-500">*</span>
                  </Label>
                  <select
                    {...register(`meals.${index}.meal_type` as any)}
                    className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-10 px-3"
                  >
                    <option value="">Select meal type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                  {(errors as any)?.meals?.[index]?.meal_type && (
                    <p className="text-sm text-red-400 ml-1">
                      {(errors as any).meals[index].meal_type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium ml-1 text-sm">
                    Food Name <span className="text-orange-500">*</span>
                  </Label>
                  <Input
                    {...register(`meals.${index}.food_name` as any)}
                    placeholder="e.g., Grilled Chicken"
                    className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-10"
                  />
                  {(errors as any)?.meals?.[index]?.food_name && (
                    <p className="text-sm text-red-400 ml-1">
                      {(errors as any).meals[index].food_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium ml-1 text-sm">
                    Calories <span className="text-orange-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      {...register(`meals.${index}.calories` as any, { valueAsNumber: true })}
                      placeholder="0"
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
                  {(errors as any)?.meals?.[index]?.calories && (
                    <p className="text-sm text-red-400 ml-1">
                      {(errors as any).meals[index].calories.message}
                    </p>
                  )}
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
          <>{initialData ? 'Update Diet Plan' : 'Create Diet Plan'}</>
        )}
      </Button>
    </form>
  );
}
