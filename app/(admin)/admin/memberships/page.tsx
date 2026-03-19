'use client';

import { useGetMemberships, useDeleteMembership } from './_query/membership-query';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Loader2, DollarSign, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function MembershipsPage() {
  const { data: memberships, isLoading } = useGetMemberships();
  const deleteMutation = useDeleteMembership();

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] ${outfit.className}`}>
      <div className="max-w-7xl mx-auto p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Membership Plans
            </h1>
            <Link href="/admin/memberships/create">
              <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0">
                <Plus className="mr-2 h-5 w-5" />
                Create Plan
              </Button>
            </Link>
          </div>
          <p className="text-slate-400">Manage your gym membership plans and pricing</p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          </div>
        ) : memberships && memberships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{membership.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>{membership.duration_months} months</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                    <DollarSign className="h-4 w-4 text-orange-400" />
                    <span className="text-lg font-bold text-orange-400">{membership.price}</span>
                  </div>
                </div>

                {membership.description && (
                  <div className="mb-4 flex items-start gap-2">
                    <FileText className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300 line-clamp-3">{membership.description}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                  <Link href={`/admin/memberships/${membership.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-10 rounded-lg bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white hover:border-orange-500/50"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(membership.id, membership.name)}
                    disabled={deleteMutation.isPending}
                    className="h-10 px-4 rounded-lg bg-red-950/30 border-red-800/50 text-red-400 hover:bg-red-900/50 hover:text-red-300 hover:border-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
            <FileText className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No membership plans yet</h3>
            <p className="text-slate-500 mb-6">Create your first membership plan to get started</p>
            <Link href="/admin/memberships/create">
              <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0">
                <Plus className="mr-2 h-5 w-5" />
                Create Plan
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}