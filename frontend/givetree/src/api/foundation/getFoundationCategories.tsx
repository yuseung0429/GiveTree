import fetchWrapper from "@/lib/fetchWrapper";

export async function getFoundationCategories(): Promise<{
  ok: boolean;
  data?: string[];
  message?: string;
}> {
  try {
    const response = await fetchWrapper('/foundations/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        ok: false,
        message: '카테고리 목록을 불러올 수 없습니다.',
      };
    }

    const data = await response.json();
    return {
      ok: true,
      data,
    };
  } catch {
    return {
      ok: false,
      message: '서버 에러가 발생했습니다',
    };
  }
}
