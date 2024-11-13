'use server';

import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

type ModifyMemberState = FormState<'name' | 'profileImageUrl'>;

export default async function modifyMember(
  _: ModifyMemberState,
  formData: FormData
): Promise<ModifyMemberState> {
  const name = formData.get('name'),
    profileImageUrl = formData.get('profileImageUrl');

  try {
    const response = await fetchWrapper(`/members`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        profileImageUrl,
      }),
    });

    switch (response.status) {
      case 200:
        return { success: true };
      default:
        return { message: '알 수 없는 오류가 발생하였습니다.' };
    }
  } catch {
    return { message: '알 수 없는 오류가 발생하였습니다.' };
  }
}
