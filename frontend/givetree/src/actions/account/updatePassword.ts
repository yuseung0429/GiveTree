'use server';

import fetchWrapper from '@/lib/fetchWrapper';

interface UpdatePasswordResponse {
  success: boolean;
  message?: string;
}

export async function updatePassword(
  simplePassword: string
): Promise<UpdatePasswordResponse> {
  try {
    const response = await fetchWrapper('/finance', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        simplePassword,
      }),
    });

    if (!response.ok) {
      throw new Error('비밀번호 수정에 실패했습니다.');
    }

    return { success: true };
  } catch (error) {
    console.error('Password update error:', error);
    throw error instanceof Error
      ? error
      : new Error('서버 오류가 발생했습니다.');
  }
}
