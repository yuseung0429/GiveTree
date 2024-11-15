import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

export interface ChatMessage {
  senderId: number;
  content: string;
  createdAt: string;
}

interface ConnectProps {
  chatroomId: number;
  onOpen: () => void;
  onError: () => void;
  onClose: () => void;
  onMessage: (message: ChatMessage) => void;
}

const useChat = (server: string = `${process.env.NEXT_PUBLIC_API_URL}/ws`) => {
  const socketRef = useRef<Client>();
  const destinationRef = useRef<string>('');

  useEffect(() => {
    return () => {
      const socket = socketRef.current;
      socket?.deactivate();
    };
  }, []);

  const connect = useCallback(
    ({ chatroomId, onOpen, onError, onClose, onMessage }: ConnectProps) => {
      socketRef.current = new Client({
        webSocketFactory: () =>
          new SockJS(server, null, {
            transports: ['websocket', 'jsonp'],
          }),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      destinationRef.current = `/topic/chatroom/${chatroomId}`;

      const socket = socketRef.current;

      if (!socket) {
        return;
      }

      socket.onConnect = () => {
        onOpen();
        socket.subscribe(destinationRef.current, (message) => {
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
    [server]
  );

  const send = useCallback((message: string) => {
    const socket = socketRef.current;

    if (!socket) {
      return;
    }

    try {
      socket.publish({
        destination: destinationRef.current,
        body: JSON.stringify({ content: message }),
      });
    } catch {
      socket.onWebSocketError('');
    }
  }, []);

  return { connect, send };
};

export default useChat;
