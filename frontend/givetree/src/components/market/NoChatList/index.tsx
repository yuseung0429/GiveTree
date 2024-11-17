import { HiChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';

import Typography from '@/components/common/Typography';

import * as s from './NoChatList.css';

const NoChatList = () => {
  return (
    <div className={s.container}>
      <HiChatBubbleOvalLeftEllipsis size="2.5rem" />
      <Typography>채팅 내역이 없습니다.</Typography>
    </div>
  );
};

export default NoChatList;
