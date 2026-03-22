'use server';

import { revalidateTag } from 'next/cache';
import { memberService } from '@/service/member.service';

export async function deleteMemberAction(memberId: string) {
  try {
    await memberService.deleteMember(memberId);
    revalidateTag('members', {});
    return { success: true };
  } catch (error) {
    console.error('Failed to delete member:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
