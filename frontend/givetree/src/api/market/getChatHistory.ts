'use server';

import type { ChatItem } from '@/types/chat/chat';

import fetchWrapper from '@/lib/fetchWrapper';

const getChatHistory = async (chatroomId: number): Promise<ChatItem[]> => {
  const response = await fetchWrapper(`/chatrooms/${chatroomId}/histories`, {
    method: 'GET',
  });

  if (response.status !== 200) {
    throw new Error('채팅 내역을 불러오지 못했습니다.');
  }

  return await response.json();
};

export default getChatHistory;
