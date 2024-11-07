import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import ChatHeader from '@/components/market/ChatHeader';
import ChatMessageInput from '@/components/market/ChatMessageInput';
import ChatMessageList from '@/components/market/ChatMessageList';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);

  return (
    <Flex flexDirection="column" height="100%">
      <div style={{ flex: '0 0 auto' }}>
        <ChatHeader id={id} title="갤럭시노트9 블루색상 512" price={180000} />
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
}
