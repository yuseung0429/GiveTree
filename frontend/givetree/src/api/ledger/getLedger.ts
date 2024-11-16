import fetchWrapper from '@/lib/fetchWrapper';
import { Pageable } from '@/types/pageable';

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

export interface LedgerResponse extends Pageable {
  content: LedgerEntry[];
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
export async function getUserLedger(page: number, size: number) {
  try {
    const response = await fetchWrapper(`/ledgers?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: LedgerResponse = await response.json();
    return data;
  } catch {
    throw new Error('입출금 내역을 불러오는 도중 오류가 발생하였습니다.');
  }
}
