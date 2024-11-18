import { formatTime, getTimeDifference } from '@/utils/time';

import { FaTree } from 'react-icons/fa';

import type { NotificationItem } from '@/api/notification/getNotifications';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import * as s from './NotificationItem.css';

const NotificationItem = ({
  title,
  body,
  createdDateTime,
}: NotificationItem) => {
  return (
    <div className={s.container}>
      <Flex
        alignItems="center"
        gap="0.25rem"
        style={{
          paddingBottom: '0.5rem',
          borderBottom: `0.0625rem solid ${colorPalette.primary[100]}`,
        }}
      >
        <FaTree
          color={colorPalette.primary[700]}
          size="1.25rem"
          style={{ flex: '0 0 auto' }}
        />
        <Typography
          color={colorPalette.primary[900]}
          weight="semiBold"
          style={{ flex: '1 1 auto' }}
        >
          GIVE 알림
        </Typography>
        <Typography
          color={colorPalette.grey[800]}
          size={typography.size.sm}
          style={{ flex: '0 0 auto' }}
        >
          {getTimeDifference(createdDateTime)}
        </Typography>
      </Flex>
      <Typography size={typography.size.lg} weight="semiBold" ellipsis>
        {title}
      </Typography>
      <Typography color={colorPalette.grey[800]}>{body}</Typography>
      <Typography
        color={colorPalette.primary[700]}
        size={typography.size.sm}
        weight="medium"
      >
        {formatTime(createdDateTime)}
      </Typography>
    </div>
  );
};

export default NotificationItem;
