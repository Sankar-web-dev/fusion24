'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trainerSchema, TrainerFormData } from '@/app/(admin)/admin/trainers/validations/trainer.validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trainers } from '@/schema';
import { Loader2 } from 'lucide-react';

interface TrainerFormProps {
  initialData?: Trainers;
  onSubmit: (data: TrainerFormData) => void;
  isLoading?: boolean;
}

export function TrainerForm({ initialData, onSubmit, isLoading }: TrainerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainerFormData>({
    resolver: zodResolver(trainerSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email || '',
          phone: initialData.phone || '',
          specialization: initialData.specialization || '',
          experience_years: initialData.experience_years || 0,
        }
      : {
          name: '',
          email: '',
          phone: '',
          specialization: '',
          experience_years: 0,
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-300 font-medium ml-1">
          Full Name <span className="text-orange-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="e.g., John Doe"
          className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
        />
        {errors.name && (
          <p className="text-sm text-red-400 ml-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300 font-medium ml-1">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="e.g., john@example.com"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.email && (
             <p className="text-sm text-red-400 ml-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-300 font-medium ml-1">
            Phone Number
          </Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="e.g., +1 234 567 8900"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.phone && (
             <p className="text-sm text-red-400 ml-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="specialization" className="text-slate-300 font-medium ml-1">
            Specialization
          </Label>
          <Input
            id="specialization"
            {...register('specialization')}
            placeholder="e.g., Crossfit, Weightlifting"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.specialization && (
             <p className="text-sm text-red-400 ml-1">{errors.specialization.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience_years" className="text-slate-300 font-medium ml-1">
            Experience (Years)
          </Label>
          <Input
            id="experience_years"
            type="number"
            {...register('experience_years')}
            placeholder="e.g., 5"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.experience_years && (
             <p className="text-sm text-red-400 ml-1">{errors.experience_years.message}</p>
          )}
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
            {initialData ? 'Updating...' : 'Saving...'}
          </>
        ) : (
          <>{initialData ? 'Update Trainer' : 'Add Trainer'}</>
        )}
      </Button>
    </form>
  );
}
