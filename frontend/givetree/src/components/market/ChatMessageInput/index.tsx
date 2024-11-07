import { HiPaperAirplane } from 'react-icons/hi2';

import * as s from './ChatMessageInput.css';

import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';

const ChatMessageInput = () => {
  return (
    <div className={s.container}>
      <TextField />
      <div style={{ flex: '0 0 auto' }}>
        <Button size="sm" icon={<HiPaperAirplane />}>
          전송
        </Button>
      </div>
    </div>
  );
};

export default ChatMessageInput;
