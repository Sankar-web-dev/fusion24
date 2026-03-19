'use client';

import { useGetTrainers, useDeleteTrainer } from './_query/trainer-query';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, User, Phone, Mail, Award, Clock } from 'lucide-react';
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

export default function TrainersPage() {
  const { data: trainers, isLoading } = useGetTrainers();
  const deleteMutation = useDeleteTrainer();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className={`min-h-screen bg-[#0A1118] ${outfit.className}`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trainers
            </h1>
            <Link href="/admin/trainers/create" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-11 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0">
                <Plus className="mr-2 h-5 w-5" />
                Add Trainer
              </Button>
            </Link>
          </div>
          <p className="text-sm sm:text-base text-slate-400">Manage your gym's trainers and coaching staff</p>
        </div>

        {/* Content */}
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
              Loading trainers...
            </motion.p>
          </div>
        ) : trainers && trainers.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {trainers.map((trainer) => (
              <motion.div
                variants={itemVariants}
                key={trainer.id}
                className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/50 transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <User className="h-5 w-5 text-orange-500" />
                      {trainer.name}
                    </h3>
                    <div className="space-y-2 mt-4 text-sm">
                      {trainer.specialization && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Award className="h-4 w-4 text-slate-500" />
                          <span>{trainer.specialization}</span>
                        </div>
                      )}
                      {(trainer.experience_years !== null && trainer.experience_years !== undefined) && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span>{trainer.experience_years} Years Experience</span>
                        </div>
                      )}
                      {trainer.phone && (
                        <div className="flex items-center gap-2 text-slate-400">
                          <Phone className="h-4 w-4 text-slate-500" />
                          <span>{trainer.phone}</span>
                        </div>
                      )}
                      {trainer.email && (
                        <div className="flex items-center gap-2 text-slate-400 truncate">
                          <Mail className="h-4 w-4 text-slate-500" />
                          <span className="truncate">{trainer.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-5 border-t border-slate-700/50 mt-4">
                  <Link href={`/admin/trainers/${trainer.id}`} className="flex-1">
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
                        <AlertDialogTitle>Are you sure you want to delete this trainer?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                          This action cannot be undone. This will permanently delete <strong className="text-white">{trainer.name}</strong> from your system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(trainer.id)} className="bg-red-600 text-white hover:bg-red-700 border-0">
                          Delete Trainer
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
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No trainers yet</h3>
            <p className="text-slate-500 mb-6">Add your first trainer to the system</p>
            <Link href="/admin/trainers/create">
              <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0">
                <Plus className="mr-2 h-5 w-5" />
                Add Trainer
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
