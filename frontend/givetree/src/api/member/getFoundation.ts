import type { FoundationData } from '@/types/user/types';

import fetchWrapper from '@/lib/fetchWrapper';

const getFoundation = async (foundationId: string) => {
  const response = await fetchWrapper(`/foundations/${foundationId}`, {
    method: 'GET',
  });

  const data: FoundationData = await response.json();
  return data;
};

export default getFoundation;
