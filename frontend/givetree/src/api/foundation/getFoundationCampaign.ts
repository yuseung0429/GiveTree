'use server';

import convertParams from '@/utils/convertParams';

import fetchWrapper from '@/lib/fetchWrapper';
import { CampaignData } from '@/types/campaign/types';

export interface GetFoundationCampaign {
  name?: string;
  introduction?: string;
  foundationName?: string;
}

export interface FoundationCampaign {
  content: CampaignData[];
}

const getFoundationCampaign = async (params: GetFoundationCampaign = {}) => {
  const response = await fetchWrapper(
    `/campaigns${convertParams({ ...params })}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    throw new Error('에러가 발생했습니다');
  }

  const data: FoundationCampaign = await response.json();
  return data.content;
};

export default getFoundationCampaign;
