'use client';

import type { SalePostDetail } from '@/types/market/market';

import useSWR from 'swr';

const useGetSalePost = (saleId: number) => {
  const response = useSWR<SalePostDetail>(`/sales/${saleId}`, {
    errorRetryCount: 0,
  });
  return response.data;
};

export default useGetSalePost;
