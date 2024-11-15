import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

const getChatroomId = async (saleId: number, options?: RequestInit) => {
  const response = await fetch(
    `http://192.168.100.77:8080/api/sale/${saleId}/chatrooms/connect`,
    options
  );

  if (response.status !== 200) {
    throw new Error('존재하지 않는 채팅방입니다.');
  }

  const data: { chatroomId: number } = await response.json();
  return data.chatroomId;
};

export default getChatroomId;
