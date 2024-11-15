import type { ChatMessage as ChatMessageType } from '@/hooks/useChat';

import SimpleProfile from '@/components/common/SimpleProfile';
import ChatMessage from '@/components/market/ChatMessage';
import Box from '@/components/common/Box';

interface ChatMessageListProps {
  senderId: number;
  messages: ChatMessageType[];
}

const ChatMessageList = ({ senderId, messages }: ChatMessageListProps) => {
  {
    /* <ChatTimeline>2024-11-{index + 1}</ChatTimeline> */
  }

  return (
    <Box>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          createdAt="2024-11-07T01:42:23.658Z"
          profile={<SimpleProfile id={message.senderId} size="sm" />}
          isMine={senderId === message.senderId}
        >
          {message.content}
        </ChatMessage>
      ))}
    </Box>
  );
};

export default ChatMessageList;
