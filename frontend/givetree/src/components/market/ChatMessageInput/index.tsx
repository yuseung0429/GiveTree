import { FormEvent, useRef } from 'react';
import { HiPaperAirplane } from 'react-icons/hi2';

import * as s from './ChatMessageInput.css';

import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';

interface ChatMessageInputProps {
  onSubmit: (message: string) => void;
}

const ChatMessageInput = ({ onSubmit }: ChatMessageInputProps) => {
  const messageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const message = messageRef.current;

    if (!message) {
      return;
    }

    onSubmit(message.value);
    message.value = '';
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={s.container}>
        <TextField ref={messageRef} name="message" />
        <div style={{ flex: '0 0 auto' }}>
          <Button type="submit" size="sm" icon={<HiPaperAirplane />}>
            전송
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatMessageInput;
