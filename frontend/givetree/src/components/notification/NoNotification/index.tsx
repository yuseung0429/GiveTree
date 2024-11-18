import { HiEllipsisHorizontal } from 'react-icons/hi2';

import Typography from '@/components/common/Typography';

import * as s from './NoNotification.css';

const NoNotification = () => {
  return (
    <div className={s.container}>
      <HiEllipsisHorizontal size="2rem" />
      <Typography>알림이 없습니다.</Typography>
    </div>
  );
};

export default NoNotification;
