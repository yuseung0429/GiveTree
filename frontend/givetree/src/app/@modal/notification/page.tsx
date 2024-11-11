'use client';

import useNotification from '@/hooks/useNotification';

import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import Flex from '@/components/common/Flex';

export default function Notification() {
  const { token, permission } = useNotification();

  return (
    <Box padding="1rem">
      <Flex flexDirection="column" gap="0.5rem">
        <Typography>token</Typography>
        <Box
          backgroundColor={colorPalette.primary[50]}
          padding="1rem"
          borderRadius="0.5rem"
          style={{ wordBreak: 'break-all' }}
        >
          {token}
        </Box>

        <Typography>permission</Typography>
        <Box
          backgroundColor={colorPalette.primary[50]}
          padding="1rem"
          borderRadius="0.5rem"
          style={{ wordBreak: 'break-all' }}
        >
          {permission}
        </Box>
      </Flex>
    </Box>
  );
}
