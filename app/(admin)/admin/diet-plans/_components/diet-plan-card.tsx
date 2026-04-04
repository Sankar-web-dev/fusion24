'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DietPlans, DietMeals } from '@/schema';
import { Edit, Trash2, Utensils, Flame, Apple } from 'lucide-react';

interface DietPlanCardProps {
  dietPlan: DietPlans & { meals?: DietMeals[]; diet_meals?: DietMeals[] };
  onEdit: (dietPlan: DietPlans & { meals?: DietMeals[]; diet_meals?: DietMeals[] }) => void;
  onDelete: (id: string) => void;
}

export function DietPlanCard({ dietPlan, onEdit, onDelete }: DietPlanCardProps) {
  // Get meals from either property (diet_meals from DB, meals from form)
  const meals = dietPlan.diet_meals || dietPlan.meals || [];
  
  const totalCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0);
  
  const getMealTypeColor = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'lunch':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'dinner':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'snack':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Utensils className="text-green-400 w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{dietPlan.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                  {totalCalories} cal
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                  {meals.length} meals
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(dietPlan)}
              className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(dietPlan.id)}
              className="bg-red-900/20 border-red-600/50 text-red-400 hover:bg-red-900/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {dietPlan.description && (
          <p className="text-slate-400 text-sm">{dietPlan.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>{totalCalories} total calories</span>
          </div>
          <div className="flex items-center gap-2">
            <Apple className="w-4 h-4 text-green-400" />
            <span>{meals.length} meals</span>
          </div>
        </div>

        {/* {meals.length > 0 && (
          <div className="mt-4">
            <h4 className="text-white font-medium mb-3">Meals</h4>
            <div className="space-y-2">
              {meals.slice(0, 3).map((meal, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={`text-xs ${getMealTypeColor(meal.meal_type || '')}`}>
                      {meal.meal_type}
                    </Badge>
                    <span className="font-medium text-slate-200">{meal.food_name}</span>
                  </div>
                  <span className="text-slate-400">
                    {meal.calories} cal
                  </span>
                </div>
              ))}
              {meals.length > 3 && (
                <div className="text-center text-sm text-slate-400 py-2">
                  +{meals.length - 3} more meals
                </div>
              )}
            </div>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}
