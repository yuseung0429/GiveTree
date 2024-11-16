'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export async function confirmPassword(formData: FormData) {
  const simplePassword = formData.get('simplePassword');

  if (!simplePassword || typeof simplePassword !== 'string') {
    throw new Error('비밀번호를 입력해주세요.');
  }

  if (!/^\d{6}$/.test(simplePassword)) {
    throw new Error('비밀번호는 6자리 숫자여야 합니다.');
  }

  try {
    const response = await fetchWrapper('/finance/simple-password/valid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        simplePassword,
      }),
    });

    const data = await response.json();

    if (response.ok && data.isValid) {
      return { success: true };
    } else if (response.ok && !data.isValid) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    throw new Error('비밀번호가 일치하지 않습니다.');
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('서버 오류가 발생했습니다.');
  }
}
