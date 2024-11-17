import getNotifications from '@/api/notification/getNotifications';

import Box from '@/components/common/Box';
import NotificationItem from '@/components/notification/NotificationItem';

export default async function Notification() {
  const data = await getNotifications();

  return (
    <Box height="100%" padding="0.5rem" style={{ overflow: 'scroll' }}>
      {data.map((item, index) => (
        <NotificationItem key={index} {...item} />
      ))}
    </Box>
  );
}
