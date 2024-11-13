import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import convertParams from '@/utils/convertParams';

import type { SalePostList, SaleSearchParameter } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

const searchSalePosts = async (
  params: SaleSearchParameter,
  options?: RequestInit
) => {
  const response = await fetchWrapper(
    `/sales/search${convertParams({ ...params, size: 100 })}`,
    options
  );

  if (response.status !== 200) {
    return [];
  }

  const data: SalePostList = await response.json();
  return data;
};

export default searchSalePosts;
