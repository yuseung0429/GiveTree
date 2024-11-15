import { axiosInstance } from '@/api/axiosInstance';

const getChatroomId = async (saleId: number) => {
  console.log('saleId: ', saleId);
  const response = await axiosInstance.post(`/chatrooms/connect`, { saleId });

  if (response.status !== 200) {
    throw new Error('존재하지 않는 채팅방입니다.');
  }
  console.log(response);

  const data: { chatroomId: number } = response.data;
  return data.chatroomId;
};

export default getChatroomId;
