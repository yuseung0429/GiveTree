import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import type { UserData } from '@/types/user/types';

import fetchWrapper from '@/lib/fetchWrapper';

const getMember = async (id: number, options?: RequestInit) => {
  const response = fetchWrapper(`/members/${id}`, {
    method: 'GET',
    ...options,
  });
  const data: UserData = await (await response).json();
  return data;
};

export default getMember;
