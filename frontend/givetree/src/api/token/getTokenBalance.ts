'use server';

import fetchWrapper from '@/lib/fetchWrapper';

interface TokenBalance {
  balance: number;
}

export async function getTokenBalance(): Promise<{
  ok: boolean;
  data?: TokenBalance;
  message?: string;
  status?: number;
}> {
  try {
    const response = await fetchWrapper('/tokens/balance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        ok: false,
        message: response.statusText || '토큰 잔액을 불러올 수 없습니다.',
        status: response.status,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Token Balance API Error:', error);
    return {
      ok: false,
      message: '서버 에러가 발생했습니다',
    };
  }
}
