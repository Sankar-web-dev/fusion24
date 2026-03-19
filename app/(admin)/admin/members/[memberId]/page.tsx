'use client';

import { MemberForm } from '../_components/member-form';
import { useGetMemberById, useUpdateMember } from '../_query/member-query';
import { useGetPaymentsByMemberId } from '../_query/payment-query';
import { MemberUpdateFormData } from '@/app/(admin)/admin/members/validations/member.validation';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, UserCog, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.memberId as string;

  const { data: member, isLoading } = useGetMemberById(memberId);
  const updateMutation = useUpdateMember();

  const handleSubmit = (data: MemberUpdateFormData) => {
    updateMutation.mutate(
      { id: memberId, data },
      {
        onSuccess: () => {
          router.push('/admin/members');
        },
      }
    );
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] ${outfit.className}`}>
      <div className="max-w-3xl mx-auto p-6 sm:p-8">
        <Link
          href="/admin/members"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Members</span>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              <UserCog className="text-white w-6 h-6" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Edit Member
            </h1>
          </div>
          <p className="text-slate-400 ml-15">Update member details and assignments</p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            </div>
          ) : member ? (
            <MemberForm
              initialData={member}
              onSubmit={handleSubmit}
              isLoading={updateMutation.isPending}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400">Member not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
