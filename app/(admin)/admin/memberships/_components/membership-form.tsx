'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { membershipSchema, MembershipFormData } from '@/app/(admin)/admin/memberships/validations/membership.validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MembershipPlans } from '@/schema';
import { Loader2 } from 'lucide-react';

interface MembershipFormProps {
  initialData?: MembershipPlans;
  onSubmit: (data: MembershipFormData) => void;
  isLoading?: boolean;
}

export function MembershipForm({ initialData, onSubmit, isLoading }: MembershipFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          duration_months: initialData.duration_months,
          price: initialData.price,
          description: initialData.description || '',
        }
      : {
          name: '',
          duration_months: 1,
          price: 0,
          description: '',
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-300 font-medium ml-1">
          Plan Name <span className="text-orange-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="e.g., Premium Monthly"
          className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
        />
        {errors.name && (
          <p className="text-sm text-red-400 ml-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="duration_months" className="text-slate-300 font-medium ml-1">
            Duration (Months) <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="duration_months"
            type="number"
            {...register('duration_months')}
            placeholder="e.g., 12"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.duration_months && (
            <p className="text-sm text-red-400 ml-1">{errors.duration_months.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-slate-300 font-medium ml-1">
            Price ($) <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price')}
            placeholder="e.g., 99.99"
            className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
          />
          {errors.price && (
            <p className="text-sm text-red-400 ml-1">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-slate-300 font-medium ml-1">
          Description
        </Label>
        <textarea
          id="description"
          {...register('description')}
          placeholder="Describe the membership plan benefits..."
          rows={4}
          className="w-full bg-slate-950/60 border border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl p-3 resize-none"
        />
        {errors.description && (
          <p className="text-sm text-red-400 ml-1">{errors.description.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {initialData ? 'Updating...' : 'Creating...'}
          </>
        ) : (
          <>{initialData ? 'Update Membership Plan' : 'Create Membership Plan'}</>
        )}
      </Button>
    </form>
  );
}