import { axiosInstance } from '@/api/axiosInstance';

const getChatroomId = async (saleId: number) => {
  const response = await axiosInstance.post(`/chatrooms/connect`, { saleId });

  if (response.status !== 200) {
    throw new Error('존재하지 않는 채팅방입니다.');
  }

  const data: { chatroomId: number } = response.data;
  return data.chatroomId;
};

export default getChatroomId;
