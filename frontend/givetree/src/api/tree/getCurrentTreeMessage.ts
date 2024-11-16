'use server';

import convertParams from '@/utils/convertParams';

import fetchWrapper from '@/lib/fetchWrapper';
import { TreeCurrentMessage, TreeCurrentParams } from '@/types/tree/types';

const getCurrentTreeMessage = async (params: TreeCurrentParams = {}) => {
  const response = await fetchWrapper(
    `/donations/campaigns/tree${convertParams({ ...params })}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    throw new Error('에러가 발생했습니다');
  }

  const data: TreeCurrentMessage = await response.json();
  return data;
};

export default getCurrentTreeMessage;
