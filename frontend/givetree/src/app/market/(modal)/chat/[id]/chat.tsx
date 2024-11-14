import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import ChatHeader from '@/components/market/ChatHeader';
import ChatMessageInput from '@/components/market/ChatMessageInput';
import ChatMessageList from '@/components/market/ChatMessageList';

interface ChatProps {
  id: number;
}

const Chat = ({ id }: ChatProps) => {
  return (
    <Flex flexDirection="column" height="100%">
      <div style={{ flex: '0 0 auto' }}>
        <ChatHeader id={id} />
      </div>
      <Box
        padding="0 0.75rem 0.5rem 0.75rem"
        backgroundColor={colorPalette.grey[100]}
        style={{ flex: '1 1 auto', overflow: 'scroll' }}
      >
        <ChatMessageList />
      </Box>
      <div style={{ flex: '0 0 auto' }}>
        <ChatMessageInput />
      </div>
    </Flex>
  );
};

export default Chat;
