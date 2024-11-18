'use client';

import useSWR from 'swr';

import { TokenListResult } from '@/types/token/token';

const useGetFoundationTokenList = () => {
  const { data } = useSWR<TokenListResult>('/tokens/donations/foundations', {
    dedupingInterval: 3000,
  });
  return data;
};

export default useGetFoundationTokenList;
