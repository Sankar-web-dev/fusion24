'use server';

import { supabaseAdmin, supabase } from '@/lib/supabase';

export async function bulkImportMembers(membersData: any[]) {
  if (!supabaseAdmin) {
    return { success: false, error: 'Supabase Admin is not configured.' };
  }

  let successCount = 0;
  let errors = [];

  try {
    // Fetch mappings
    const [{ data: plans }, { data: trainers }] = await Promise.all([
      supabaseAdmin.from('membership_plans').select('id, name, price'),
      supabaseAdmin.from('trainers').select('id, name')
    ]);

    const planMap = new Map();
    if (plans) (plans as any[]).forEach(p => planMap.set(p.name.toLowerCase().trim(), p));

    const trainerMap = new Map();
    if (trainers) (trainers as any[]).forEach(t => trainerMap.set(t.name.toLowerCase().trim(), t.id));

    for (let i = 0; i < membersData.length; i++) {
        const member = membersData[i];
        const rowNum = i + 1; // 1-indexed for logging
        try {
            // Find plan ID
            const planKey = member.planName ? String(member.planName).toLowerCase().trim() : '';
            const matchedPlan = planKey ? planMap.get(planKey) : null;
            const planId = matchedPlan?.id || null;
            const planPrice = matchedPlan?.price || 0;

            if (!planId) {
                errors.push(`Row ${rowNum}: Plan "${member.planName || 'empty'}" not found in database. Must exactly match an existing Plan Name.`);
                continue; // Skip this user
            }

            // Find trainer
            const trainerKey = member.trainerName ? String(member.trainerName).toLowerCase().trim() : '';
            const trainerId = trainerKey ? (trainerMap.get(trainerKey) || null) : null;

            // 1. Create Auth User
            const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
                email: member.email,
                password: 'fusion24@123', // default password
                email_confirm: true,
                user_metadata: { role: 'member' }
            });

            if (authError) {
                errors.push(`Row ${rowNum}: Auth user failed for ${member.email} - ${authError.message}`);
                continue;
            }

            if (!authData.user) {
                errors.push(`Row ${rowNum}: Unknown error creating auth user for ${member.email}`);
                continue;
            }

            const joinedDate = member.joinedDate ? new Date(member.joinedDate).toISOString() : new Date().toISOString();

            // 2. Create Member Record
            const { data: newMember, error } = await supabaseAdmin
                .from('members')
                .insert([{
                auth_user_id: authData.user.id,
                name: member.name,
                email: member.email,
                phone: member.phone || null,
                membership_plan_id: planId,
                trainer_id: trainerId,
                joined_date: joinedDate,
                }] as any)
                .select()
                .single();

            if (error || !newMember) {
                await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
                errors.push(`Row ${rowNum}: Failed to save member details for ${member.email} - ${error?.message}`);
                continue;
            }

            // 3. Create Payment Record (Same logic as MemberService.createMember)
            const paymentStatus = member.paymentStatus ? String(member.paymentStatus).toLowerCase().trim() : 'unpaid';
            const safePaymentStatus = ['paid', 'partial', 'unpaid'].includes(paymentStatus) ? paymentStatus : 'unpaid';
            
            const paidAmount = safePaymentStatus === 'paid' ? planPrice : (safePaymentStatus === 'partial' ? (Number(member.paymentAmount) || 0) : 0);
            
            const billingStart = member.billingStart ? new Date(member.billingStart).toISOString() : new Date().toISOString();
            const billingEnd = member.billingEnd ? new Date(member.billingEnd).toISOString() : null;
            const paidDate = member.paidDate ? new Date(member.paidDate).toISOString() : null;

            const { error: paymentError } = await supabaseAdmin
                .from('payments')
                .insert([{
                    member_id: (newMember as any).id,
                    membership_plan_id: planId,
                    amount: planPrice,
                    paid_amount: paidAmount,
                    billing_start: billingStart,
                    billing_end: billingEnd,
                    status: safePaymentStatus,
                    paid_date: paidDate,
                }] as any);

            if (paymentError) {
                errors.push(`Row ${rowNum}: Member created but payment record failed for ${member.email} - ${paymentError.message}`);
            }

            successCount++;
        } catch (err: any) {
            errors.push(`Row ${i + 1}: Exception for ${member.email} - ${err.message}`);
        }
    }

    return { success: true, count: successCount, errors };
  } catch(e: any) {
      return { success: false, error: `Failed to initialize import logic: ${e.message}`, count: 0, errors: [] }
  }
}
