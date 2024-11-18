'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export async function deleteAccount(): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const response = await fetchWrapper('/accounts/registered', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('계좌 삭제에 실패했습니다.');
    }

    return { success: true };
  } catch (error) {
    console.error('Account deletion error:', error);
    throw error instanceof Error
      ? error
      : new Error('서버 오류가 발생했습니다.');
  }
}
