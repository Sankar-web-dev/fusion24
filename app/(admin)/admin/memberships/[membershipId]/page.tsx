'use client';

import { MembershipForm } from '../_components/membership-form';
import { useGetMembershipById, useUpdateMembership } from '../_query/membership-query';
import { MembershipFormData } from '@/app/(admin)/admin/memberships/validations/membership.validation';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Dumbbell, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function EditMembershipPage() {
  const router = useRouter();
  const params = useParams();
  const membershipId = params.membershipId as string;

  const { data: membership, isLoading } = useGetMembershipById(membershipId);
  const updateMutation = useUpdateMembership();

  const handleSubmit = (data: MembershipFormData) => {
    updateMutation.mutate(
      { id: membershipId, data },
      {
        onSuccess: () => {
          router.push('/admin/memberships');
        },
      }
    );
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] ${outfit.className}`}>
      <div className="max-w-3xl mx-auto p-6 sm:p-8">
        {/* Back Button */}
        <Link
          href="/admin/memberships"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Memberships</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              <Dumbbell className="text-white w-6 h-6" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Edit Membership Plan
            </h1>
          </div>
          <p className="text-slate-400 ml-15">Update membership plan details</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            </div>
          ) : membership ? (
            <MembershipForm
              initialData={membership}
              onSubmit={handleSubmit}
              isLoading={updateMutation.isPending}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400">Membership plan not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}