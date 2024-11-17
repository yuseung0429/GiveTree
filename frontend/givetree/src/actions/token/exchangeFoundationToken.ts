'use server';

import fetchWrapper from '@/lib/fetchWrapper';

interface ExchangeFoundationTokenResult {
  result: boolean;
  error?: string;
}

export default async function exchangeFoundationToken(
  transactionIds: number[],
  simplePassword: string,
  message: string
): Promise<ExchangeFoundationTokenResult> {
  try {
    const response = await fetchWrapper(
      '/tokens/donations/foundations/exchange',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionIds,
          simplePassword,
          message,
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
