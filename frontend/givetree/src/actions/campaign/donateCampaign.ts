'use server';

import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

type DonateCampaignState = FormState<
  'amount' | 'message' | 'simplePassword' | 'campaignId'
>;

export default async function donateCampaign(
  _: DonateCampaignState,
  formData: FormData
): Promise<DonateCampaignState> {
  const amount = formData.get('amount'),
    message = formData.get('message'),
    simplePassword = formData.get('simplePassword'),
    campaignsId = formData.get('campaignId');

  try {
    const response = await fetchWrapper(`/donations/campaigns/${campaignsId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Number(amount?.toString().replaceAll(',', '')),
        message,
        simplePassword,
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    return { message: '알 수 없는 오류가 발생하였습니다.' };
  } catch {
    return { message: '알 수 없는 오류가 발생하였습니다.' };
  }
}
