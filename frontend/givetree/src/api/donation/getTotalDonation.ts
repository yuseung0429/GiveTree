'use server';

import convertParams from '@/utils/convertParams';

import fetchWrapper from '@/lib/fetchWrapper';

export interface GetTotalDonationParams {
  'start-date'?: string;
  'end-date'?: string;
}

export interface TotalDonation {
  amount: number;
}

const getTotalDonation = async (params: GetTotalDonationParams = {}) => {
  const response = await fetchWrapper(
    `/donations/amount${convertParams({ ...params })}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    throw new Error('에러가 발생했습니다');
  }

  const data: TotalDonation = await response.json();
  return data.amount;
};

export default getTotalDonation;
