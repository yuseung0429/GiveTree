'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export default async function payItem(
  saleId: number,
  simplePassword: string
): Promise<{ result: boolean; message?: string }> {
  try {
    const response = await fetchWrapper(`/sales/${saleId}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        simplePassword,
      }),
    });

    return {
      result: response.status === 200,
      message: '알 수 없는 오류가 발생하였습니다.',
    };
  } catch (error) {
    console.log(error);
    return { result: false, message: '알 수 없는 오류가 발생하였습니다.' };
  }
}
