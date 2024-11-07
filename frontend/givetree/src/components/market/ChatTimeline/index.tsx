import { ReactNode } from 'react';

import * as s from './ChatTimeline.css';

interface ChatTimelineProps {
  children: ReactNode;
}

const ChatTimeline = ({ children }: ChatTimelineProps) => {
  return (
    <div className={s.container}>
      <div className={s.box}>{children}</div>
    </div>
  );
};

export default ChatTimeline;
