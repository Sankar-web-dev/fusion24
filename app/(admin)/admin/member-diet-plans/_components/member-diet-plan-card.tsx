'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberDietPlans, DietPlans, DietMeals } from '@/schema';
import { Edit, Trash2, Utensils, User, Calendar, Flame } from 'lucide-react';

interface MemberDietPlanCardProps {
  memberDietPlan: MemberDietPlans & { 
    member: { name: string; email: string }, 
    diet_plan: DietPlans & { diet_meals: DietMeals[] } 
  };
  onEdit: (memberDietPlan: MemberDietPlans & { 
    member: { name: string; email: string }, 
    diet_plan: DietPlans & { diet_meals: DietMeals[] } 
  }) => void;
  onDelete: (id: string) => void;
}

export function MemberDietPlanCard({ memberDietPlan, onEdit, onDelete }: MemberDietPlanCardProps) {
  const meals = memberDietPlan.diet_plan.diet_meals || [];
  const assignedDate = memberDietPlan.assigned_date ? new Date(memberDietPlan.assigned_date).toLocaleDateString() : 'N/A';
  
  const totalCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0);

  const getMealTypeColor = (mealType: string) => {
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

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Utensils className="text-green-400 w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{memberDietPlan.diet_plan.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                  {memberDietPlan.member.name}
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                  {totalCalories} cal
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(memberDietPlan)}
              className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button> */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(memberDietPlan.id)}
              className="bg-red-900/20 border-red-600/50 text-red-400 hover:bg-red-900/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {memberDietPlan.diet_plan.description && (
          <p className="text-slate-400 text-sm">{memberDietPlan.diet_plan.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>{memberDietPlan.member.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-400" />
            <span>Assigned: {assignedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>{totalCalories} total calories</span>
          </div>
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-green-400" />
            <span>{meals.length} meals</span>
          </div>
        </div>

       
      </CardContent>
    </Card>
  );
}
