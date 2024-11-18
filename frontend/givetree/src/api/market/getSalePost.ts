import { SalePostDetail } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

const getSalePost = async (id: number) => {
  const response = await fetchWrapper(`/sales/${id}`, { method: 'GET' });

  if (response.status !== 200) {
    throw new Error('삭제된 게시글입니다.');
  }

  const data: SalePostDetail = await response.json();
  return data;
};

export default getSalePost;
