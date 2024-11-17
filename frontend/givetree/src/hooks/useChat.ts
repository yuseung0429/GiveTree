import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

export interface ChatMessage {
  senderId: number;
  content: string;
  createdAt: string;
}

interface ConnectProps {
  onOpen: () => void;
  onError: () => void;
  onClose: () => void;
  onMessage: (message: ChatMessage) => void;
}

const useChat = (
  chatroomId: number,
  server: string = `${process.env.NEXT_PUBLIC_API_URL}/ws`
) => {
  const socketRef = useRef<Client>();

  useEffect(() => {
    return () => {
      const socket = socketRef.current;
      socket?.deactivate();
    };
  }, []);

  const connect = useCallback(
    ({ onOpen, onError, onClose, onMessage }: ConnectProps) => {
      socketRef.current = new Client({
        webSocketFactory: () =>
          new SockJS(server, null, {
            transports: ['websocket', 'jsonp'],
          }),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      const socket = socketRef.current;

      if (!socket) {
        return;
      }

      socket.onConnect = () => {
        onOpen();
        socket.subscribe(`/topic/chatroom/${chatroomId}`, (message) => {
          const data: ChatMessage = JSON.parse(message.body);
          onMessage(data);
        });
      };

      socket.onWebSocketError = () => {
        socket.deactivate();
        onError();
      };
      socket.onWebSocketClose = () => {
        socket.deactivate();
        onClose();
      };

      socket.activate();
    },
    [server, chatroomId]
  );

  const send = useCallback(
    (senderId: number, message: string) => {
      const socket = socketRef.current;

      if (!socket) {
        return;
      }

      try {
        socket.publish({
          destination: `/pub/chatroom/${chatroomId}`,
          body: JSON.stringify({ senderId, content: message }),
        });
      } catch {
        socket.onWebSocketError('');
      }
    },
    [chatroomId]
  );

  return { connect, send };
};

export default useChat;
