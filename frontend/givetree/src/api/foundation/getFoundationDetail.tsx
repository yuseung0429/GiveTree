import fetchWrapper from '@/lib/fetchWrapper';

export interface Foundation {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string | null;
  role: string;
  introduction: string;
  corporateRegistrationNumber: string;
  totalFundraisingAmount: number;
  executedAmount: number;
  phoneNumber: string;
  address: string;
  holdingCampaignCount: number;
  titleImageUrl: string;
  imageUrls: string[];
  categories: string[];
}

export async function getFoundationById(id: string): Promise<{
  ok: boolean;
  data?: Foundation | null;
  message?: string;
  status?: number;
}> {
  try {
    const response = await fetchWrapper(`/foundations/${id}`, {
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
        message: response.statusText || '재단 정보를 불러올 수 없습니다.',
        status: response.status,
      };
    }

    const data = await response.json();
    console.log('Foundation Detail API Response:', data);

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Foundation Detail API Error:', error);
    return {
      ok: false,
      data: null,
      message: '서버 에러가 발생했습니다',
    };
  }
}
