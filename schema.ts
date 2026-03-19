export interface Members {
  id: string;
  auth_user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  membership_plan_id: string | null;
  trainer_id: string | null;
  joined_date: Date | null;
  created_at: Date | null;
}

export interface CalorieLogs {
  id: string;
  member_id: string;
  type: 'food' | 'workout';
  item_name: string;
  quantity: number | null;
  calories: number;
  created_at: Date | null;
}

export interface DietMeals {
  id: string;
  diet_plan_id: string | null;
  meal_type: string | null;
  food_name: string | null;
  calories: number | null;
  created_at: Date | null;
}

export interface DietPlans {
  id: string;
  name: string;
  description: string | null;
  created_at: Date | null;
}

export interface MemberDietPlans {
  id: string;
  member_id: string;
  diet_plan_id: string;
  assigned_date: Date | null;
  created_at: Date | null;
}

export interface MemberWorkoutPlans {
  id: string;
  member_id: string;
  workout_plan_id: string;
  assigned_date: Date | null;
  created_at: Date | null;
}

export interface MembershipPlans {
  id: string;
  name: string;
  duration_months: number;
  price: number;
  description: string | null;
  created_at: Date | null;
}

  export interface Payments {
    id: string;
    member_id: string;
    membership_plan_id: string;
    amount: number;
    paid_amount: number;
    billing_start: Date;
    billing_end: Date;
    status: 'paid' | 'partial' | 'unpaid';
    paid_date: Date | null;
    created_at: Date | null;
}

export interface Trainers {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  specialization: string | null;
  experience_years: number | null;
  created_at: Date | null;
}

export interface WorkoutExercises {
  id: string;
  workout_plan_id: string | null;
  exercise_name: string;
  sets: number | null;
  reps: number | null;
  rest_seconds: number | null;
  created_at: Date | null;
}

export interface WorkoutPlans {
  id: string;
  name: string;
  difficulty: string | null;
  description: string | null;
  created_at: Date | null;
}
