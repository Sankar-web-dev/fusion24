'use client';

import { useGetMembers, useDeleteMember } from './_query/member-query';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, User, CreditCard, Dumbbell, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const outfit = Outfit({ subsets: ['latin'] });

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function MembersPage() {
  const { data: members, isLoading } = useGetMembers();
  const deleteMutation = useDeleteMember();
  const [memberships, setMemberships] = useState<Record<string, MembershipPlans>>({});
  const [trainers, setTrainers] = useState<Record<string, Trainers>>({});
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredMembers = members?.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.phone && member.phone.includes(searchTerm))
  );

  const getPaymentBadge = (member: any) => {
    const payment = member.payments?.[0];
    if (!payment) return <Badge variant="outline" className="bg-slate-800 border-slate-700 text-slate-400">No Payment</Badge>;

    switch (payment.status) {
      case 'paid':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center gap-1 w-fit">
            <CheckCircle2 className="h-3 w-3" /> Paid
          </Badge>
        );
      case 'partial':
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 flex items-center gap-1 w-fit">
            <Clock className="h-3 w-3" /> Partial
          </Badge>
        );
      case 'unpaid':
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1 w-fit">
            <AlertCircle className="h-3 w-3" /> Unpaid
          </Badge>
        );
      default:
        return <Badge variant="outline">{payment.status}</Badge>;
    }
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] text-slate-200 ${outfit.className}`}>
      <div className="max-w-7xl mx-auto p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-1 bg-orange-500 rounded-full" />
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Members
              </h1>
            </div>
            <p className="text-slate-400 max-w-md">Manage gym members, track payments, and monitor membership statuses.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <Input 
                placeholder="Search name or email..." 
                className="pl-10 h-11 w-64 bg-slate-900/50 border-slate-700/50 text-white rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/admin/members/create">
              <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0">
                <Plus className="mr-2 h-5 w-5" />
                Add Member
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500"
              />
            </div>
            <p className="text-orange-500 font-bold tracking-wider animate-pulse">LOADING MEMBERS</p>
          </div>
        ) : filteredMembers && filteredMembers.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Table>
              <TableHeader className="bg-slate-900/60 border-b border-slate-800">
                <TableRow className="hover:bg-transparent border-slate-800">
                  <TableHead className="px-6 py-5 text-sm font-bold text-slate-400 hover:text-slate-300 transition-colors uppercase tracking-wider">Member</TableHead>
                  <TableHead className="px-6 py-5 text-sm font-bold text-slate-400 hover:text-slate-300 transition-colors uppercase tracking-wider">Plan & Trainer</TableHead>
                  <TableHead className="px-6 py-5 text-sm font-bold text-slate-400 hover:text-slate-300 transition-colors uppercase tracking-wider">Join Date</TableHead>
                  <TableHead className="px-6 py-5 text-sm font-bold text-slate-400 hover:text-slate-300 transition-colors uppercase tracking-wider">Payment Status</TableHead>
                  <TableHead className="px-6 py-5 text-sm font-bold text-slate-400 hover:text-slate-300 transition-colors uppercase tracking-wider text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow 
                    key={member.id} 
                    className="hover:bg-slate-800/30 transition-colors group border-slate-800/50"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-orange-500/50 transition-colors">
                          <User className="text-slate-400 group-hover:text-orange-500 h-5 w-5 transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-bold">{member.name}</span>
                          <span className="text-xs text-slate-500 truncate max-w-[180px]">{member.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        {member.membership_plan_id && memberships[member.membership_plan_id] ? (
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="h-3.5 w-3.5 text-orange-400/70" />
                            <span className="text-slate-300">{memberships[member.membership_plan_id].name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600">No Plan</span>
                        )}
                        {member.trainer_id && trainers[member.trainer_id] ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Dumbbell className="h-3.5 w-3.5 text-blue-400/70" />
                            <span className="text-slate-300">{trainers[member.trainer_id].name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600 italic">No Trainer</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-slate-400">
                      {member.joined_date ? new Date(member.joined_date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {getPaymentBadge(member)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/members/${member.id}`}>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-lg hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        
                        <AlertDialog>
                          <AlertDialogTrigger render={<Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>}>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#0A1118] border border-slate-800 text-white p-6 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
                            <AlertDialogHeader>
                              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="h-6 w-6 text-red-500" />
                              </div>
                              <AlertDialogTitle className="text-xl font-bold">Delete Member?</AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-400">
                                This will permanently delete <strong className="text-white">{member.name}</strong> and their authentication credentials.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-6 flex gap-3">
                              <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 rounded-xl h-11 flex-1">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(member.id)} 
                                className="bg-red-600 text-white hover:bg-red-700 border-0 rounded-xl h-11 flex-1 font-bold"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No members found</h3>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">
              {searchTerm ? `No members match "${searchTerm}"` : "Your member list is empty. Start by adding a new gym member."}
            </p>
            <Link href="/admin/members/create">
              <Button className="h-12 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <Plus className="mr-2 h-5 w-5" />
                Add Your First Member
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
