'use server';

import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

type ModifyFoundationState = FormState<
  'name' | 'profileImageUrl' | 'introduction'
>;

export default async function modifyFoundation(
  _: ModifyFoundationState,
  formData: FormData
): Promise<ModifyFoundationState> {
  const introduction = formData.get('introduction'),
    name = formData.get('name'),
    profileImageUrl = formData.get('profileImageUrl');

  try {
    const response = await fetchWrapper(`/foundations`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        introduction,
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
