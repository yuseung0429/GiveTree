import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import type { UserData } from '@/types/user/types';

import fetchWrapper from '@/lib/fetchWrapper';

const getSessionMember = async (options?: RequestInit) => {
  const response = await fetchWrapper('/members/session', {
    method: 'GET',
    ...options,
  });

  const data: UserData = await response.json();
  return data;
};

export default getSessionMember;
