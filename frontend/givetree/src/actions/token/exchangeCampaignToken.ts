'use server';

import fetchWrapper from '@/lib/fetchWrapper';

interface ExchangeCampaignTokenResult {
  result: boolean;
  error?: string;
}

export default async function exchangeCampaignToken(
  transactionIds: number[],
  simplePassword: string
): Promise<ExchangeCampaignTokenResult> {
  try {
    const response = await fetchWrapper(
      '/tokens/donations/campaigns/exchange',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionIds,
          simplePassword,
        }),
      }
    );

    switch (response.status) {
      case 200:
        return { result: true };
      default:
        return { result: false, error: (await response.json())?.message };
    }
  } catch {
    return { result: false, error: '서버와 연결을 실패했습니다.' };
  }
}
