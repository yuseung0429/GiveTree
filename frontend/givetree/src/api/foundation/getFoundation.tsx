import fetchWrapper from '@/lib/fetchWrapper';

export interface Foundation {
  id: number;
  email: string;
  name: string;
  profileImageUrl?: string;
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

interface PaginationResponse {
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface FoundationResponse extends PaginationResponse {
  content: Foundation[];
}

export interface SearchFoundationParams {
  name?: string;
  category?: string;
  page?: number;
  size?: number;
}

export async function searchFoundations(
  params: SearchFoundationParams = {}
): Promise<{
  ok: boolean;
  data?: FoundationResponse | null;
  message?: string;
  status?: number;
}> {
  try {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);
    if (params.category) queryParams.append('category', params.category);
    if (params.page !== undefined)
      queryParams.append('page', params.page.toString());
    if (params.size !== undefined)
      queryParams.append('size', params.size.toString());

    const response = await fetchWrapper(
      `/foundations?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return {
        ok: false,
        data: null,
        message: response.statusText || '재단 정보를 불러올 수 없습니다.',
        status: response.status,
      };
    }

    const data = await response.json();
    console.log('API Response:', data);

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
