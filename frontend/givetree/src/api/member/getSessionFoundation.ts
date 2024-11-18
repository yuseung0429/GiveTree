import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import type { FoundationData } from '@/types/user/types';

import fetchWrapper from '@/lib/fetchWrapper';

const getSessionFoundation = async (options?: RequestInit) => {
  const response = await fetchWrapper('/foundations/session', {
    method: 'GET',
    ...options,
  });

  const data: FoundationData = await response.json();
  return data;
};

export default getSessionFoundation;
