'use server';

import type { UserData } from '@/types/user/types';

import fetchWrapper from '@/lib/fetchWrapper';

const getCounterpart = async (chatroomId: number): Promise<UserData> => {
  const response = await fetchWrapper(`/chatrooms/${chatroomId}/counterpart`, {
    method: 'GET',
  });

  return await response.json();
};

export default getCounterpart;
