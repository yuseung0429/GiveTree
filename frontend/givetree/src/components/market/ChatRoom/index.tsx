'use client';

import { useEffect, useRef, useState } from 'react';

import { ChatItem } from '@/types/chat/chat';

import useChat, { type ChatMessage as ChatMessageType } from '@/hooks/useChat';
import useDialog from '@/hooks/useDialog';

import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import ChatMessageInput from '@/components/market/ChatMessageInput';
import ChatMessageList from '@/components/market/ChatMessageList';

interface ChatRoomProps {
  senderId: number;
  saleId: number;
  chatroomId: number;
  chatHistory: ChatItem[];
}

const ChatRoom = ({
  senderId,
  saleId,
  chatroomId,
  chatHistory,
}: ChatRoomProps) => {
  const { alert } = useDialog();
  const { connect, send } = useChat(chatroomId);
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>(
    chatHistory.map((item) => {
      return {
        senderId: item.senderId,
        content: item.message,
        createdAt: item.createdAt,
      };
    })
  );

  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) {
      return;
    }

    chat.scrollTop = chat.scrollHeight;
  }, [messages]);

  useEffect(() => {
    (async () => {
      connect({
        onOpen() {
          console.log('Chat connected');
        },

        onMessage(message) {
          setMessages((prev) => [...prev, message]);
          console.log(message);
        },

        async onError() {
          await alert('채팅 서버에 오류가 발생하였습니다.');
        },

        async onClose() {
          await alert('채팅 서버와 연결이 끊어졌습니다.');
        },
      });
    })();
  }, [chatroomId, saleId, connect, send, alert]);

  const handleMessageSubmit = (message: string) => {
    if (!message.trim()) {
      return;
    }

    send(senderId, message.trim());
  };

  return (
    <Flex flexDirection="column" height="100%">
      <Box
        ref={chatRef}
        padding="0 0.75rem 0.5rem 0.75rem"
        backgroundColor={colorPalette.grey[100]}
        style={{ flex: '1 1 auto', overflow: 'scroll' }}
      >
        <ChatMessageList senderId={senderId} messages={messages} />
      </Box>
      <div style={{ flex: '0 0 auto' }}>
        <ChatMessageInput onSubmit={handleMessageSubmit} />
      </div>
    </Flex>
  );
};

export default ChatRoom;
