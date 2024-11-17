'use server';

import convertParams from '@/utils/convertParams';

import fetchWrapper from '@/lib/fetchWrapper';

export interface GetDonationDetailParams {
  'start-date'?: string;
  'end-date'?: string;
  page?: string;
  size?: string;
  own?: boolean;
}

export interface DonationDetailItem {
  userId: number;
  userImage: string | null;
  userName: string;
  donationType: string;
  amount: number | 0;
  message: string | null;
  createdAt: string;
}

export interface DonationDetail {
  content: DonationDetailItem[];
}

const getDonationDetail = async (
  params: GetDonationDetailParams = {},
  foundationId: number
) => {
  const response = await fetchWrapper(
    `/donations/foundations/${foundationId}${convertParams({ ...params })}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    throw new Error('에러가 발생했습니다');
  }

  const data: DonationDetail = await response.json();

  return data.content;
};

export default getDonationDetail;
