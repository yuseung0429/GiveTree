import getChatHistory from '@/api/market/getChatHistory';
import getSessionMember from '@/api/member/getSessionMember';

import Flex from '@/components/common/Flex';
import ChatHeader from '@/components/market/ChatHeader';
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
      <div style={{ flex: '0 0 auto' }}>
        <ChatHeader id={saleId} />
      </div>
      <div style={{ flex: '1 1 auto', overflowY: 'scroll' }}>
        <ChatRoom
          senderId={senderId}
          saleId={saleId}
          chatroomId={chatroomId}
          chatHistory={chatHistory}
        />
      </div>
    </Flex>
  );
};

export default Chat;
