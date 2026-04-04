'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberDietPlans, DietPlans, DietMeals } from '@/schema';
import { Utensils, Clock, Calendar, Flame, ChevronDown, ChevronUp, Target, Loader2 } from 'lucide-react';
import { useMemberDietPlans } from './_hooks/use-member-diet-plans';

interface MemberDietPlansWithDetails extends MemberDietPlans {
  diet_plan: DietPlans & { diet_meals: DietMeals[] };
}

export default function MemberDietPage() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const { data: memberDietPlans = [], isLoading, error } = useMemberDietPlans();

  const getMealTypeColor = (mealType: string | null) => {
    switch (mealType?.toLowerCase()) {
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

  const getMealTypeIcon = (mealType: string | null) => {
    switch (mealType?.toLowerCase()) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '☀️';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍿';
      default:
        return '🍽️';
    }
  };

  const togglePlanExpansion = (planId: string) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const groupMealsByType = (meals: DietMeals[]) => {
    const grouped: { [key: string]: DietMeals[] } = {};
    meals.forEach(meal => {
      const type = meal.meal_type || 'other';
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(meal);
    });
    return grouped;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Diet Plans</h1>
        <p className="text-slate-400">View your assigned diet plans and meal details</p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
            <p className="text-slate-400">Loading diet plans...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <p className="text-red-400 mb-2">Error loading diet plans</p>
            <p className="text-slate-400 text-sm">
              {error instanceof Error ? error.message : 'Unable to load your diet plans. Please contact support.'}
            </p>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6">
        {memberDietPlans.map((memberDietPlan) => {
          const totalCalories = memberDietPlan.diet_plan.diet_meals.reduce(
            (total, meal) => total + (meal.calories || 0), 
            0
          );
          const groupedMeals = groupMealsByType(memberDietPlan.diet_plan.diet_meals);

          return (
            <Card key={memberDietPlan.id} className="bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50 transition-all">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Utensils className="text-green-400 w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {memberDietPlan.diet_plan.name}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Assigned: {memberDietPlan.assigned_date 
                              ? new Date(memberDietPlan.assigned_date).toLocaleDateString()
                              : 'N/A'
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <Flame className="w-4 h-4 text-orange-400" />
                          <span>{totalCalories} cal/day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePlanExpansion(memberDietPlan.id)}
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    {expandedPlan === memberDietPlan.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {memberDietPlan.diet_plan.description && (
                  <p className="text-slate-300 text-sm">
                    {memberDietPlan.diet_plan.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>{memberDietPlan.diet_plan.diet_meals.length} meals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>{totalCalories} total calories</span>
                  </div>
                </div>

                {expandedPlan === memberDietPlan.id && (
                  <div className="mt-6 space-y-6 border-t border-slate-700/50 pt-6">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-green-400" />
                      Meal Details
                    </h4>
                    
                    <div className="space-y-6">
                      {Object.entries(groupedMeals).map(([mealType, meals]) => (
                        <div key={mealType} className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">{getMealTypeIcon(mealType)}</span>
                            <h5 className="text-white font-medium capitalize">{mealType}</h5>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getMealTypeColor(mealType)}`}
                            >
                              {meals.reduce((total, meal) => total + (meal.calories || 0), 0)} cal
                            </Badge>
                          </div>
                          
                          <div className="grid gap-3">
                            {meals.map((meal, index) => (
                              <div 
                                key={meal.id} 
                                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 hover:border-slate-600/50 transition-all"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center text-xs font-bold text-green-400">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <h6 className="text-white font-medium text-sm">{meal.food_name}</h6>
                                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                        <span className="flex items-center gap-1">
                                          <Flame className="w-3 h-3 text-orange-400" />
                                          {meal.calories} cal
                                        </span>
                                        <Badge 
                                          variant="secondary" 
                                          className={`text-xs ${getMealTypeColor(meal.meal_type)}`}
                                        >
                                          {meal.meal_type}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      )}

      {!isLoading && !error && memberDietPlans.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Diet Plans Assigned</h3>
          <p className="text-slate-400">
            You don't have any diet plans assigned yet. Contact your trainer to get started.
          </p>
        </div>
      )}
    </div>
  );
}
