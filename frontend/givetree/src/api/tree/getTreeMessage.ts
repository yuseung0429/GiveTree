'use server';

import convertParams from '@/utils/convertParams';

import fetchWrapper from '@/lib/fetchWrapper';
import { TreeMessage, TreeParams } from '@/types/tree/types';

const getTreeMessage = async (params: TreeParams = {}, campaignId: number) => {
  const response = await fetchWrapper(
    `/donations/campaigns/${campaignId}/tree${convertParams({ ...params })}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    throw new Error('에러가 발생했습니다.');
  }

  const data: TreeMessage = await response.json();
  return data;
};

export default getTreeMessage;
