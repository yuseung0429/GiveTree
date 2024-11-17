'use client';

import useSWR from 'swr';

import { TokenListResult } from '@/types/token/token';

const useGetFoundationTokenList = () => {
  const { data } = useSWR<TokenListResult>('/tokens/donations/foundations');
  return data;
};

export default useGetFoundationTokenList;
