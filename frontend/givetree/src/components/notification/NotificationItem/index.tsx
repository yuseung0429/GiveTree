import { getTimeDifference } from '@/utils/time';

import type { NotificationItem } from '@/api/notification/getNotifications';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

import typography from '@/styles/tokens/typography';
import colorPalette from '@/styles/tokens/colorPalette';

import * as s from './NotificationItem.css';

const NotificationItem = ({
  title,
  body,
  createdDateTime,
}: NotificationItem) => {
  return (
    <div className={s.container}>
      <Flex justifyContent="space-between" gap="0.5rem">
        <Typography size={typography.size.lg} ellipsis>
          {title}
        </Typography>
        <Typography
          color={colorPalette.grey[800]}
          size={typography.size.sm}
          style={{ flex: '0 0 auto' }}
        >
          {getTimeDifference(createdDateTime)}
        </Typography>
      </Flex>
      <Typography
        color={colorPalette.grey[800]}
        style={{ marginTop: '0.5rem' }}
      >
        {body}
      </Typography>
    </div>
  );
};

export default NotificationItem;
