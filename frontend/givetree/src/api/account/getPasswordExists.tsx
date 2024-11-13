import fetchWrapper from '@/lib/fetchWrapper';

export interface PasswordExistsResponse {
  exists: boolean;
}

export async function getPasswordExists(): Promise<{
  ok: boolean;
  data?: PasswordExistsResponse;
  message?: string;
  status?: number;
}> {
  try {
    const response = await fetchWrapper('/finance/exists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        ok: false,
        message: response.statusText || '비밀번호 정보를 확인할 수 없습니다.',
        status: response.status,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Password exists check error:', error);
    return {
      ok: false,
      message: '서버 에러가 발생했습니다',
    };
  }
}
