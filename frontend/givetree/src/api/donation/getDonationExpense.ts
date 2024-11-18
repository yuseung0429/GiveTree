'use server';

import convertParams from '@/utils/convertParams';

import fetchWrapper from '@/lib/fetchWrapper';

export interface GetDonationExpenseParams {
  'start-date'?: string;
  'end-date'?: string;
  page?: string;
  size?: string;
  own?: boolean;
}

export interface DonationExpenseItem {
  userId: number;
  userImage: string | null;
  userName: string;
  donationType: string;
  amount: number | 0;
  message: string | null;
  createdAt: string;
}

export interface DonationExpense {
  content: DonationExpenseItem[];
}

const getDonationExpense = async (
  params: GetDonationExpenseParams = {},
  foundationId: number
) => {
  const response = await fetchWrapper(
    `/donations/foundations/${foundationId}${convertParams({ ...params })}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    throw new Error('에러가 발생했습니다');
  }

  const data: DonationExpense = await response.json();

  const filteredContent = data.content.filter((item) => item.message !== null);

  return filteredContent;
};

export default getDonationExpense;
