'use client';

import { TrainerForm } from '../_components/trainer-form';
import { useGetTrainer, useUpdateTrainer } from '../_query/trainer-query';
import { TrainerFormData } from '@/app/(admin)/admin/trainers/validations/trainer.validation';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function EditTrainerPage() {
  const router = useRouter();
  const params = useParams();
  const trainerId = params.trainerId as string;

  const { data: trainer, isLoading } = useGetTrainer(trainerId);
  const updateMutation = useUpdateTrainer();

  const handleSubmit = (data: TrainerFormData) => {
    updateMutation.mutate(
      { id: trainerId, ...data },
      {
        onSuccess: () => {
          router.push('/admin/trainers');
        },
      }
    );
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] ${outfit.className}`}>
      <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Back Button */}
        <Link
          href="/admin/trainers"
          className="inline-flex items-center gap-2 text-sm sm:text-base text-slate-400 hover:text-orange-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Trainers</span>
        </Link>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)] shrink-0">
              <Edit className="text-white w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Edit Trainer Profile
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-400 sm:ml-15 mt-2">Update details for this trainer</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            </div>
          ) : trainer ? (
            <TrainerForm
              initialData={trainer}
              onSubmit={handleSubmit}
              isLoading={updateMutation.isPending}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400">Trainer not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
