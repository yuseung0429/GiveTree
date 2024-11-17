'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export interface CampaignStatistic {
  donationCount: number | 0;
  donationAmount: number | null;
  goalAmount: number | null;
}

const getCampaignStatistic = async (campaignId: number) => {
  const response = await fetchWrapper(
    `/donations/campaigns/${campaignId}/statistic`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    throw new Error('에러가 발생했습니다');
  }

  const data: CampaignStatistic = await response.json();
  return data;
};

export default getCampaignStatistic;
