'use client';

import useSWR from 'swr';

import { TokenListResult } from '@/types/token/token';

const useGetCampaignTokens = () => {
  const { data } = useSWR<TokenListResult>('/tokens/donations/campaigns');
  return data;
};

export default useGetCampaignTokens;
