'use client';

import { TrainerForm } from '../_components/trainer-form';
import { useCreateTrainer } from '../_query/trainer-query';
import { TrainerFormData } from '@/app/(admin)/admin/trainers/validations/trainer.validation';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function CreateTrainerPage() {
  const router = useRouter();
  const createMutation = useCreateTrainer();

  const handleSubmit = (data: TrainerFormData) => {
    const payload = {
      ...data,
      email: data.email || null,
      phone: data.phone || null,
      specialization: data.specialization || null,
      experience_years: data.experience_years ?? null,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        router.push('/admin/trainers');
      },
    });
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] ${outfit.className}`}>
      <div className="max-w-3xl mx-auto p-6 sm:p-8">
        {/* Back Button */}
        <Link
          href="/admin/trainers"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Trainers</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              <UserPlus className="text-white w-6 h-6" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Add New Trainer
            </h1>
          </div>
          <p className="text-slate-400 ml-15">Register a new trainer in the system</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <TrainerForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
        </div>
      </div>
    </div>
  );
}
