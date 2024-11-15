'use server';

import fetchWrapper from '@/lib/fetchWrapper';

interface TokenBalance {
  balance: number;
}

export async function getTokenBalance() {
  try {
    const response = await fetchWrapper('/tokens/balance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: TokenBalance = await response.json();
    return data;
  } catch {
    throw new Error('잔액 조회에 실패했습니다.');
  }
}
