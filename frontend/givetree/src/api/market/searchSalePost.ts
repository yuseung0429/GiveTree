import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import convertParams from '@/utils/convertParams';

import type { SalePostList, SaleSearchParameter } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

const getSalePost = async (
  params: SaleSearchParameter,
  options?: RequestInit
) => {
  const response = fetchWrapper(
    `/sales/search${convertParams({ ...params })}`,
    options
  );
  const data: SalePostList = await (await response).json();
  return data;
};

export default getSalePost;
