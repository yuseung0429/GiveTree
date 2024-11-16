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

  return (
    <Flex flexDirection="column" height="100%">
      <div style={{ flex: '0 0 auto' }}>
        <ChatHeader id={saleId} />
      </div>
      <div style={{ flex: '1 1 auto', overflowY: 'scroll' }}>
        <ChatRoom senderId={senderId} saleId={saleId} chatroomId={chatroomId} />
      </div>
    </Flex>
  );
};

export default Chat;
