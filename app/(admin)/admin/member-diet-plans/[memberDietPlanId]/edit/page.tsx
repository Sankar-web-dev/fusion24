'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { MemberDietPlanForm } from '../../_components/member-diet-plan-form';
import { useGetMemberDietPlan, useUpdateMemberDietPlan } from '../../_queries/member-diet-plan-query';
import { memberDietPlanService } from '@/service/member-diet-plan.service';
import { dietPlanService } from '@/service/diet-plan.service';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Link from 'next/link';

interface Member {
  id: string;
  name: string;
  email: string;
}

interface DietPlan {
  id: string;
  name: string;
}

export default function EditMemberDietPlanPage() {
  const router = useRouter();
  const params = useParams();
  const memberDietPlanId = params.memberDietPlanId as string;
  
  const { data: memberDietPlan, isLoading: isLoadingPlan } = useGetMemberDietPlan(memberDietPlanId);
  const updateMemberDietPlanMutation = useUpdateMemberDietPlan();
  
  const [members, setMembers] = useState<Member[]>([]);
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch diet plans directly
      const dietPlansData = await dietPlanService.getAllDietPlans();
      setDietPlans(dietPlansData);

      // Fetch members directly from members table
      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('id, name, email')
        .order('name');
      
      if (membersError) {
        console.error('Error fetching members:', membersError);
        toast.error('Failed to load members');
      } else {
        setMembers(membersData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: {
    member_id: string;
    diet_plan_id: string;
    assigned_date?: string;
  }) => {
    try {
      await updateMemberDietPlanMutation.mutateAsync({
        id: memberDietPlanId,
        data
      });
      toast.success('Diet plan assignment updated successfully!');
      router.push('/admin/member-diet-plans');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update diet plan assignment');
    }
  };

  if (isLoadingPlan) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-400">Loading assignment details...</div>
        </div>
      </div>
    );
  }

  if (!memberDietPlan) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-400">Assignment not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/member-diet-plans">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assignments
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Edit Diet Plan Assignment</h1>
        </div>
        <p className="text-slate-400">Update the diet plan assignment for {memberDietPlan.member.name}</p>
      </div>
      
      <MemberDietPlanForm
        memberDietPlan={memberDietPlan}
        members={members}
        dietPlans={dietPlans}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/member-diet-plans')}
        isLoading={updateMemberDietPlanMutation.isPending}
      />
    </div>
  );
}
