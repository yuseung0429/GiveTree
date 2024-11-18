import { HiMiniBell } from 'react-icons/hi2';

import getNotifications from '@/api/notification/getNotifications';

import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import NoNotification from '@/components/notification/NoNotification';
import NotificationItem from '@/components/notification/NotificationItem';

export default async function Notification() {
  const data = await getNotifications();

  return (
    <Box height="100%" padding="0.75rem" style={{ overflow: 'scroll' }}>
      <Flex flexDirection="column" height="100%">
        <Box paddingBottom="0.75rem" style={{ flex: '0 0 auto' }}>
          <Typography
            color={colorPalette.primary[700]}
            weight="semiBold"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <HiMiniBell size="1.5rem" />
            알림
          </Typography>
        </Box>
        <Flex
          flexDirection="column"
          gap="0.75rem"
          style={{ flex: '1 1 auto', overflow: 'scroll' }}
        >
          {data.length === 0 ? (
            <NoNotification />
          ) : (
            data.map((item, index) => (
              <NotificationItem key={index} {...item} />
            ))
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export const dynamic = 'force-dynamic';
