'use server';

import convertParams from '@/utils/convertParams';

import fetchWrapper from '@/lib/fetchWrapper';

export interface GetFoundationStatistic {
  startDate?: string;
  endDate?: string;
}

export interface FoundationStatistic {
  donationCount: number;
  donationAmount: number;
  regularSubscriptionCount: number;
}

const getFoundationStatistic = async (
  params: GetFoundationStatistic = {},
  foundationId: number
) => {
  const response = await fetchWrapper(
    `/donations/foundations/${foundationId}/statistic${convertParams({
      ...params,
    })}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    throw new Error('에러가 발생했습니다');
  }

  const data: FoundationStatistic = await response.json();
  return data;
};

export default getFoundationStatistic;
