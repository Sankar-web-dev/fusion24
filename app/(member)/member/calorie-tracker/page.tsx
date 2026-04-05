'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader2, Plus, Flame, Dumbbell, Utensils, Calculator, Target, History } from 'lucide-react';
import { useCalorieLogs, useCreateCalorieLog } from './_hooks/use-calorie-logs';
import { CalorieLogs as CalorieLogType } from '@/schema';

export default function CalorieTrackerPage() {
  const [type, setType] = useState<'food' | 'workout'>('food');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock Goal for visual tracking
  const dailyGoal = 2500;
  
  // Database hooks
  const { data: logs = [], isLoading: logsLoading } = useCalorieLogs();
  const createLogMutation = useCreateCalorieLog();

  const calculateCalories = async () => {
    if (!item.trim() || (type === 'food' && !quantity.trim()) || (type === 'workout' && (!sets.trim() || !reps.trim()))) return;
    setIsLoading(true);
    
    try {
      // For workout, construct quantity from sets and reps
      const workoutQuantity = type === 'workout' ? `${sets.trim()} sets of ${reps.trim()} reps` : quantity.trim();
      
      const response = await fetch('/api/calorie-calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, item: item.trim(), quantity: workoutQuantity }),
      });

      if (!response.ok) throw new Error('Calculation failed');

      const parsedData = await response.json();
      
      // Save to database
      await createLogMutation.mutateAsync({
        type,
        item_name: item.trim(),
        quantity: type === 'food' ? quantity.trim() : workoutQuantity,
        calories: parsedData.calories || 0,
        sets: type === 'workout' ? parseInt(sets.trim()) || undefined : undefined,
        reps: type === 'workout' ? parseInt(reps.trim()) || undefined : undefined,
      });
      
      // Clear form
      setItem('');
      setQuantity('');
      setSets('');
      setReps('');
      
    } catch (error) {
      console.error(error);
      // Show user-friendly error message
      if (error instanceof Error) {
        if (error.message.includes('Calculation failed')) {
          alert('Failed to calculate calories. Please check your input and try again.');
        } else if (error.message.includes('API configuration')) {
          alert('Service temporarily unavailable. Please try again later.');
        } else {
          alert('An error occurred. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const consumed = logs.filter(r => r.type === 'food').reduce((sum, r) => sum + r.calories, 0);
  const burned = logs.filter(r => r.type === 'workout').reduce((sum, r) => sum + r.calories, 0);
  const netCalories = consumed - burned;
  const progressPercentage = Math.min((netCalories / dailyGoal) * 100, 100);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Fitness Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your energy balance and performance.</p>
        </div>
       
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input & Progress */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-white">
                <Plus className="w-5 h-5 text-blue-400" /> Log Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Category</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={type === 'food' ? 'default' : 'outline'}
                    onClick={() => setType('food')}
                    className={type === 'food' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-700 text-slate-400'}
                  >
                    <Utensils className="w-4 h-4 mr-2" /> Food
                  </Button>
                  <Button 
                    variant={type === 'workout' ? 'default' : 'outline'}
                    onClick={() => setType('workout')}
                    className={type === 'workout' ? 'bg-orange-600 hover:bg-orange-700' : 'border-slate-700 text-slate-400'}
                  >
                    <Dumbbell className="w-4 h-4 mr-2" /> Workout
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Details</Label>
                <Input
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  placeholder={type === 'food' ? 'Salmon Fillet...' : 'Deadlift...'}
                  className="bg-slate-950/50 border-slate-800 text-white h-11"
                />
                
                {type === 'food' ? (
                  <Input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="250g, 1kg, 500ml, 2 cups..."
                    className="bg-slate-950/50 border-slate-800 text-white h-11"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                      placeholder="Sets (3)"
                      type="number"
                      className="bg-slate-950/50 border-slate-800 text-white h-11"
                    />
                    <Input
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      placeholder="Reps (12)"
                      type="number"
                      className="bg-slate-950/50 border-slate-800 text-white h-11"
                    />
                  </div>
                )}
              </div>

              <Button 
                onClick={calculateCalories}
                disabled={isLoading || createLogMutation.isPending}
                className="w-full bg-white text-black hover:bg-slate-200 font-bold h-11 transition-all"
              >
                {isLoading || createLogMutation.isPending ? <Loader2 className="animate-spin" /> : 'Log Entry'}
              </Button>
            </CardContent>
          </Card>

          {/* Calorie Progress Card */}
          <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-sm text-blue-200/70 font-medium">Daily Net Target</p>
                  <h3 className="text-3xl font-bold text-white">{netCalories} <span className="text-lg font-normal text-blue-200/50">/ {dailyGoal}</span></h3>
                </div>
                <Target className="text-blue-400 w-8 h-8 opacity-50" />
              </div>
              <Progress value={progressPercentage} className="h-2 bg-slate-800" />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Summary & History */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Consumed', value: consumed, icon: Utensils, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { label: 'Burned', value: burned, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
              { label: 'Remaining', value: dailyGoal - netCalories, icon: Target, color: 'text-blue-400', bg: 'bg-blue-500/10' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-slate-500">Your logs for today</CardDescription>
              </div>
              <History className="text-slate-600 w-5 h-5" />
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="animate-spin mx-auto mb-4" />
                  <p className="text-slate-500">Loading...</p>
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
                  <p className="text-slate-500">No data logged today.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {logs.map((result: CalorieLogType) => (
                    <div 
                      key={result.id}
                      className="group flex items-center justify-between p-4 bg-slate-950/40 hover:bg-slate-800/40 rounded-2xl border border-slate-800/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${result.type === 'food' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                          {result.type === 'food' ? <Utensils className="w-5 h-5" /> : <Dumbbell className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{result.item_name}</p>
                          <p className="text-xs text-slate-500">{result.quantity} • {result.created_at ? new Date(result.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${result.type === 'food' ? 'text-blue-400' : 'text-orange-400'}`}>
                          {result.type === 'food' ? '+' : '-'}{result.calories}
                        </p>
                        <p className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">kcal</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}