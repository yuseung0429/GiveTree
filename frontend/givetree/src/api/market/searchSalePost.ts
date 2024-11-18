'use server';

import convertParams from '@/utils/convertParams';

import type { SalePostList, SaleSearchParameter } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

const searchSalePosts = async (
  params: SaleSearchParameter
): Promise<SalePostList> => {
  const response = await fetchWrapper(
    `/sales/search${convertParams({ ...params, size: 100 })}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    return [];
  }

  return await response.json();
};

export default searchSalePosts;
