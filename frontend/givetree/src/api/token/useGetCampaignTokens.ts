'use client';

import useSWR from 'swr';

import { TokenListResult } from '@/types/token/token';

const useGetCampaignTokens = () => {
  const { data } = useSWR<TokenListResult>('/tokens/donations/campaigns', {
    dedupingInterval: 3000,
  });
  return data;
};

export default useGetCampaignTokens;
