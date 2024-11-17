'use server';

import convertParams from '@/utils/convertParams';

import fetchWrapper from '@/lib/fetchWrapper';

export interface GetFoundationStatisticParams {
  'start-date'?: string;
  'end-date'?: string;
}

export interface FoundationStatistic {
  donationCount: number | null;
  donationAmount: number | null;
  regularSubscriptionCount: number | 0;
}

const getFoundationStatistic = async (
  params: GetFoundationStatisticParams,
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
