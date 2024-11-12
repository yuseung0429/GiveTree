'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export async function registerPassword(formData: FormData) {
  const simplePassword = formData.get('simplePassword');

  try {
    const response = await fetchWrapper(`/finance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        simplePassword,
      }),
    });

    const data = await response.text();
    console.log('Response data:', data);

    if (response.ok) {
      return { success: true };
    }

    if (data.includes('MEMBER_FINANCE_ALREADY_EXISTS')) {
      throw new Error('이미 등록된 금융정보가 있습니다.');
    }

    throw new Error('비밀번호 등록에 실패했습니다.');
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('서버 오류가 발생했습니다.');
  }
}
