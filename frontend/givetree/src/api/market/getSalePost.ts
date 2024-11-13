import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import { SalePostDetail } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

const getSalePost = async (id: number, options?: RequestInit) => {
  const response = await fetchWrapper(`/sales/${id}`, options);

  if (response.status !== 200) {
    throw new Error('삭제된 게시글입니다.');
  }

  const data: SalePostDetail = await response.json();
  return data;
};

export default getSalePost;
