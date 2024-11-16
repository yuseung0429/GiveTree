'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export async function registerAccount(accountNumber: string) {
  try {
    const response = await fetchWrapper('/accounts/registered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountNumber,
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    throw new Error('계좌 등록에 실패했습니다.');
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('서버 오류가 발생했습니다.');
  }
}
