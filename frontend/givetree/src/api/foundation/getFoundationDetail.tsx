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

export async function getFoundationById(id: number): Promise<Foundation> {
  try {
    const response = await fetchWrapper(`/foundations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch {
    throw new Error('재단 정보를 가져오지 못했습니다.');
  }
}
