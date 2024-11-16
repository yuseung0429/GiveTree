import React from 'react';

import { formatDate } from '@/utils/time';

import type { ChatMessage as ChatMessageType } from '@/hooks/useChat';

import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import SimpleProfile from '@/components/common/SimpleProfile';
import ChatMessage from '@/components/market/ChatMessage';
import ChatTimeline from '@/components/market/ChatTimeline';
import Typography from '@/components/common/Typography';

interface ChatMessageListProps {
  senderId: number;
  messages: ChatMessageType[];
}

const ChatMessageList = ({ senderId, messages }: ChatMessageListProps) => {
  return (
    <Box>
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          {!index ||
            (new Date(messages.at(index - 1)!.createdAt).toDateString() !==
              new Date(message.createdAt).toDateString() && (
              <ChatTimeline>{formatDate(message.createdAt)}</ChatTimeline>
            ))}
          {message.senderId === 0 ? (
            <Typography
              size={typography.size.sm}
              style={{
                padding: '0.5rem',
                lineHeight: '1.5',
                textAlign: 'center',
              }}
            >
              {message.content.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          ) : (
            <ChatMessage
              createdAt={message.createdAt}
              profile={<SimpleProfile id={message.senderId} size="sm" />}
              isMine={senderId === message.senderId}
              showProfile={
                !index || messages.at(index - 1)?.senderId !== message.senderId
              }
            >
              {message.content}
            </ChatMessage>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ChatMessageList;
