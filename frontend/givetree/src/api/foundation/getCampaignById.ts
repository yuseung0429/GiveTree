import fetchWrapper from '@/lib/fetchWrapper';

export interface Campaign {
  id: number;
  foundationId: number;
  foundationName: string;
  name: string;
  introduction: string;
  startDate: string;
  endDate: string;
  targetFundraisingAmount: number;
  currentFundraisingAmount: number;
  titleImageUrl: string;
  imageUrls: string[];
}

export async function getCampaignById(campaignId: string): Promise<{
  ok: boolean;
  data?: Campaign | null;
  message?: string;
  status?: number;
}> {
  try {
    const response = await fetchWrapper(`/campaigns/${campaignId}`, {
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
        message:
          response.status === 404
            ? '해당 캠페인을 찾을 수 없습니다.'
            : '캠페인 정보를 불러올 수 없습니다.',
        status: response.status,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Campaign Detail API Error:', error);
    return {
      ok: false,
      data: null,
      message: '서버 에러가 발생했습니다',
    };
  }
}
