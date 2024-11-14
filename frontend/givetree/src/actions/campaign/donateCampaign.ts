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
    campaignId = formData.get('campaignId');
  console.log(simplePassword, message, amount);
  try {
    const response = await fetchWrapper(`/campaigns/${campaignId}/donate`, {
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

    switch (response.status) {
      case 201:
        return {
          success: true,
        };
      default:
        return {
          message: '알 수 없는 오류가 발생하였습니다.',
        };
    }
  } catch {
    return { message: '알 수 없는 오류가 발생하였습니다.' };
  }
}
