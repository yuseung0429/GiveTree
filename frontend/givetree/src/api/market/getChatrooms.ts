'use server';

import type { ChatroomItem } from '@/types/chat/chat';

import fetchWrapper from '@/lib/fetchWrapper';

const getChatrooms = async (): Promise<ChatroomItem[]> => {
  const response = await fetchWrapper('/chatrooms', { method: 'GET' });

  if (response.status !== 200) {
    throw new Error('채팅 목록을 불러오지 못했습니다.');
  }

  return await response.json();
};

export default getChatrooms;
