'use server';

import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

type DonateCampaignState = FormState<
  'amount' | 'simplePassword' | 'foundationId'
>;

export default async function donateFoundation(
  _: DonateCampaignState,
  formData: FormData
): Promise<DonateCampaignState> {
  const amount = formData.get('amount'),
    simplePassword = formData.get('simplePassword'),
    foundationId = formData.get('foundationId');

  try {
    const response = await fetchWrapper(
      `/donations/foundations/${foundationId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(amount?.toString().replaceAll(',', '')),
          simplePassword,
        }),
      }
    );

    if (response.ok) {
      return { success: true };
    }

    return { message: '알 수 없는 오류가 발생하였습니다.' };
  } catch {
    return { message: '알 수 없는 오류가 발생하였습니다.' };
  }
}
