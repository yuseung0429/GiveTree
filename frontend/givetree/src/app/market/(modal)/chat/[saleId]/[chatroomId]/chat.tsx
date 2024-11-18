import getChatHistory from '@/api/market/getChatHistory';
import getSessionMember from '@/api/member/getSessionMember';

import Flex from '@/components/common/Flex';
import ChatRoom from '@/components/market/ChatRoom';

interface ChatProps {
  saleId: number;
  chatroomId: number;
}

const Chat = async ({ saleId, chatroomId }: ChatProps) => {
  const { id: senderId } = await getSessionMember();
  const chatHistory = await getChatHistory(chatroomId);

  return (
    <Flex flexDirection="column" height="100%">
      <ChatRoom
        senderId={senderId}
        saleId={saleId}
        chatroomId={chatroomId}
        chatHistory={chatHistory}
      />
    </Flex>
  );
};

export default Chat;
