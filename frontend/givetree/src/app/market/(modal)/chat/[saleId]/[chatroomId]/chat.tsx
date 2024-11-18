import getChatHistory from '@/api/market/getChatHistory';
import getCounterpart from '@/api/market/getCounterpart';
import getSessionMember from '@/api/member/getSessionMember';

import Flex from '@/components/common/Flex';
import ChatRoom from '@/components/market/ChatRoom';

interface ChatProps {
  saleId: number;
  chatroomId: number;
}

const Chat = async ({ saleId, chatroomId }: ChatProps) => {
  const [{ id: senderId }, chatHistory, counterpart] = await Promise.all([
    await getSessionMember(),
    await getChatHistory(chatroomId),
    await getCounterpart(chatroomId),
  ]);

  return (
    <Flex flexDirection="column" height="100%">
      <ChatRoom
        senderId={senderId}
        saleId={saleId}
        chatroomId={chatroomId}
        chatHistory={chatHistory}
        purchaserId={counterpart.id}
      />
    </Flex>
  );
};

export default Chat;
