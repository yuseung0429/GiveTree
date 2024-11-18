import type { Pageable } from '@/types/pageable';

import fetchWrapper from '@/lib/fetchWrapper';

export interface TransactionEntry {
  accountNumber: string;
  name: string;
  bankCode: string;
  bankName: string;
  message: string;
  amount: number;
  type: 'EXCHANGE' | 'CHARGE';
  processedAt: string;
}

export interface TransactionResponse extends Pageable {
  content: TransactionEntry[];
}

export async function getTransaction(
  page: number,
  size: number = 10
): Promise<TransactionResponse> {
  try {
    const response = await fetchWrapper(`/ledgers?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch {
    throw new Error('입출금 내역을 불러오는 도중 오류가 발생하였습니다.');
  }
}
