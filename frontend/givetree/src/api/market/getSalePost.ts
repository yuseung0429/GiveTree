import type { SalePostDetail } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

const getSalePost = async (id: number): Promise<SalePostDetail> => {
  const response = await fetchWrapper(`/sales/${id}`, { method: 'GET' });

  if (response.status !== 200) {
    throw new Error('삭제된 게시글입니다.');
  }

  return await response.json();
};

export default getSalePost;
