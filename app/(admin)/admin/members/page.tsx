'use client';

import { useGetMembers, useDeleteMember } from './_query/member-query';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Mail, Phone, Calendar, User, CreditCard, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { motion, Variants } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MembershipPlans, Trainers } from '@/schema';

const outfit = Outfit({ subsets: ['latin'] });

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function MembersPage() {
  const { data: members, isLoading } = useGetMembers();
  const deleteMutation = useDeleteMember();
  const [memberships, setMemberships] = useState<Record<string, MembershipPlans>>({});
  const [trainers, setTrainers] = useState<Record<string, Trainers>>({});

  useEffect(() => {
    const fetchData = async () => {
      const [membershipData, trainerData] = await Promise.all([
        supabase.from('membership_plans').select('*'),
        supabase.from('trainers').select('*'),
      ]);

      if (membershipData.data) {
        const membershipMap = membershipData.data.reduce((acc, m) => {
          acc[m.id] = m;
          return acc;
        }, {} as Record<string, MembershipPlans>);
        setMemberships(membershipMap);
      }

      if (trainerData.data) {
        const trainerMap = trainerData.data.reduce((acc, t) => {
          acc[t.id] = t;
          return acc;
        }, {} as Record<string, Trainers>);
        setTrainers(trainerMap);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] ${outfit.className}`}>
      <div className="max-w-7xl mx-auto p-6 sm:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Members
            </h1>
            <Link href="/admin/members/create">
              <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0">
                <Plus className="mr-2 h-5 w-5" />
                Add Member
              </Button>
            </Link>
          </div>
          <p className="text-slate-400">Manage gym members and their memberships</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-orange-500"
            />
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-orange-500/80 font-medium"
            >
              Loading members...
            </motion.p>
          </div>
        ) : members && members.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {members.map((member) => (
              <motion.div
                variants={itemVariants}
                key={member.id}
                className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/50 transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                      <User className="text-white w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      {member.joined_date && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="h-3 w-3" />
                          <span>Joined {new Date(member.joined_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  {member.membership_plan_id && memberships[member.membership_plan_id] && (
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-orange-400" />
                      <span className="text-orange-400 font-medium">
                        {memberships[member.membership_plan_id].name}
                      </span>
                    </div>
                  )}
                  {member.trainer_id && trainers[member.trainer_id] && (
                    <div className="flex items-center gap-2 text-sm">
                      <Dumbbell className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 font-medium">
                        {trainers[member.trainer_id].name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                  <Link href={`/admin/members/${member.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-10 rounded-lg bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white hover:border-orange-500/50"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger 
                      render={
                        <Button
                          variant="outline"
                          disabled={deleteMutation.isPending}
                          className="h-10 px-4 rounded-lg bg-red-950/30 border-red-800/50 text-red-400 hover:bg-red-900/50 hover:text-red-300 hover:border-red-600"
                        />
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#0A1118] border border-slate-800 text-white shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this member?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                          This action cannot be undone. This will permanently delete <strong className="text-white">{member.name}</strong> and their auth account from the system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(member.id)} className="bg-red-600 text-white hover:bg-red-700 border-0">
                          Delete Member
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl"
          >
            <User className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No members yet</h3>
            <p className="text-slate-500 mb-6">Add your first member to get started</p>
            <Link href="/admin/members/create">
              <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0">
                <Plus className="mr-2 h-5 w-5" />
                Add Member
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
