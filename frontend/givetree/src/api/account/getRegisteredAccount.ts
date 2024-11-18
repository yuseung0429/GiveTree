import fetchWrapper from '@/lib/fetchWrapper';

export interface RegisteredAccount {
  accountNumber: string;
  accountName: string;
  createdAt: string;
  expiryAt: string;
  bankCode: string;
  bankName: string;
}

export async function getRegisteredAccount(): Promise<{
  ok: boolean;
  data?: RegisteredAccount | null;
  message?: string;
  status?: number;
}> {
  try {
    const response = await fetchWrapper('/accounts/registered', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        ok: false,
        data: null,
        message: '등록된 계좌 정보를 불러올 수 없습니다.',
        status: response.status,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      ok: false,
      data: null,
      message: '서버 에러가 발생했습니다',
    };
  }
}
