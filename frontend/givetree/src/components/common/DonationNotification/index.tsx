import { ReactNode } from 'react';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import ProfileImage from '@/components/common/ProfileImage';
import Typography from '@/components/common/Typography';

interface DonationNofiticationProps {
  children: ReactNode;
  profileImage: string;
}

const DonationNotification = ({
  children,
  profileImage,
}: DonationNofiticationProps) => {
  return (
    <Box
      padding="0.75rem"
      borderRadius="0.5rem"
      backgroundColor={colorPalette.grey[200]}
    >
      <Flex alignItems="center" gap="0.5rem">
        <div style={{ flex: '0 0 auto' }}>
          <ProfileImage src={profileImage} size="sm" />
        </div>
        <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
          <Typography size={typography.size.xs} ellipsis>
            {children}
          </Typography>
        </div>
      </Flex>
    </Box>
  );
};

export default DonationNotification;
