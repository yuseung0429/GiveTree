import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import { SalePostDetail } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

const getSalePost = async (id: number, options?: RequestInit) => {
  const response = fetchWrapper(`/sales/${id}`, options);
  const data: SalePostDetail = await (await response).json();
  return data;
};

export default getSalePost;
