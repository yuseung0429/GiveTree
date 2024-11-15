import fetchWrapper from '@/lib/fetchWrapper';

// 공통 타입 정의
export interface LedgerEntry {
  accountNumber: string;
  name: string;
  bankCode: string;
  bankName: string;
  message: string;
  amount: number;
  type: string;
  processedAt: string;
}

interface PageableInfo {
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
}

export interface PaginatedResponse {
  content: LedgerEntry[];
  pageable: PageableInfo;
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

// 재단 입출금 내역 조회 함수
export async function getFoundationLedger(
  foundationId: string,
  page: number,
  size: number
): Promise<{
  ok: boolean;
  data?: PaginatedResponse;
  message?: string;
  status?: number;
}> {
  try {
    const response = await fetchWrapper(
      `/ledgers/foundations/${foundationId}?page=${page}&size=${size}`,
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
        message: response.statusText || '입출금 내역을 불러올 수 없습니다.',
        status: response.status,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Foundation Ledger API Error:', error);
    return {
      ok: false,
      message: '서버 에러가 발생했습니다',
    };
  }
}

// 사용자 입출금 내역 조회 함수
export async function getUserLedger(
  page: number,
  size: number
): Promise<{
  ok: boolean;
  data?: PaginatedResponse;
  message?: string;
  status?: number;
}> {
  try {
    const response = await fetchWrapper(`/ledgers?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        ok: false,
        message: response.statusText || '입출금 내역을 불러올 수 없습니다.',
        status: response.status,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('User Ledger API Error:', error);
    return {
      ok: false,
      message: '서버 에러가 발생했습니다',
    };
  }
}
