import React from 'react';

import Flex from '@/components/common/Flex';
import SimpleProfile from '@/components/common/SimpleProfile';
import ChatMessage from '@/components/market/ChatMessage';
import ChatTimeline from '@/components/market/ChatTimeline';

const ChatMessageList = () => {
  return (
    <Flex flexDirection="column" gap="0.75rem">
      {new Array(20).fill(0).map((value, index) => (
        <React.Fragment key={index}>
          <ChatTimeline>2024-11-{index + 1}</ChatTimeline>
          <ChatMessage
            createdAt="2024-11-07T01:42:23.658Z"
            profile={<SimpleProfile id={1} size="sm" />}
          >
            안녕하세요
          </ChatMessage>
          <ChatMessage createdAt="2024-11-07T01:42:23.658Z" me>
            안녕하세요
          </ChatMessage>
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default ChatMessageList;
