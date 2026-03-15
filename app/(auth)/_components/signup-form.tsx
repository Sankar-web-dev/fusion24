'use client';

import { useState } from 'react';
import { useSignup } from '../_query/auth.query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { Dumbbell, UserPlus } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const signupMutation = useSignup();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    signupMutation.mutate({ email, password }, {
      onSuccess: async () => {
        toast.success('Signup successful!');
        router.push('/');
      },
      onError: (error) => {
        toast.error(`Signup failed: ${error.message}`);
      }
    });
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#0A1118]">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/signup-bg.png"
          alt="Gym background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Centered Form Card */}
      <div className="w-full max-w-md relative z-10 flex flex-col items-center p-6 sm:p-0 animate-in fade-in zoom-in-95 duration-700">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Logo Section */}
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
          <Dumbbell className="text-white w-8 h-8" strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight flex items-center gap-2 text-white">
          Join <span className="text-orange-500">Fusion24</span>
        </h1>
        <div className="flex items-center gap-2 text-sm text-slate-300 mb-8 bg-slate-900/60 px-5 py-2 rounded-full border border-slate-700/50 backdrop-blur-md shadow-sm">
          <UserPlus className="w-4 h-4 text-orange-400" /> New Member Registration
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="w-full bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white">Create an Account</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 font-medium ml-1">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="member@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 font-medium ml-1">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300 font-medium ml-1">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-slate-950/60 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 rounded-xl h-12"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full mt-8 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border-0"
          >
            {signupMutation.isPending ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-8 text-center text-slate-300 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-400 font-semibold hover:text-orange-300 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}