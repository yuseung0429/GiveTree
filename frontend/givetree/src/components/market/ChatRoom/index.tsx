'use client';

import { useEffect, useRef, useState } from 'react';

import useChat, { type ChatMessage as ChatMessageType } from '@/hooks/useChat';
import useDialog from '@/hooks/useDialog';

import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import ChatMessageInput from '@/components/market/ChatMessageInput';
import ChatMessageList from '@/components/market/ChatMessageList';
import getChatroomId from '@/api/market/getChatroomId';

interface ChatRoomProps {
  senderId: number;
  saleId: number;
  chatroomId?: number;
}

const ChatRoom = ({ senderId, saleId, chatroomId }: ChatRoomProps) => {
  const { alert } = useDialog();
  const { connect, send } = useChat();
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) {
      return;
    }

    chat.scrollTop = chat.scrollHeight;
  }, [messages]);

  useEffect(() => {
    (async () => {
      let chatroom = 0;
      try {
        if (!chatroomId) {
          chatroom = await getChatroomId(saleId);
        }
      } catch {
        alert('채팅방 정보를 가져오지 못했습니다.');
      }

      console.log(chatroomId, chatroom);

      connect({
        chatroomId: chatroomId || chatroom,

        onOpen() {
          console.log('채팅 연결됨');
        },

        onMessage(message) {
          setMessages((prev) => [...prev, message]);
          console.log(message);
        },

        async onError() {
          setMessages((prev) => [...prev, { content: '이유승', senderId: 2 }]);
          // await alert('채팅 서버에 오류가 발생하였습니다.');
        },

        async onClose() {
          await alert('채팅 서버와 연결이 끊어졌습니다.');
        },
      });
    })();
  }, [chatroomId, saleId, connect, send, alert]);

  const handleMessageSubmit = (message: string) => {
    send(message);
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
