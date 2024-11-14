import getMember from '@/api/member/getMember';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import ProfileImage from '@/components/common/ProfileImage';
import Typography from '@/components/common/Typography';

import * as s from './DonationNotification.css';

interface DonationNofiticationProps {
  foundationId: number;
  contribution: number;
  price: number;
}

const DonationNotification = async ({
  foundationId,
  contribution,
  price,
}: DonationNofiticationProps) => {
  const data = await getMember(foundationId, { next: { revalidate: 300 } });

  return (
    <Box
      padding="0.75rem"
      borderRadius="0.5rem"
      backgroundColor={colorPalette.grey[200]}
    >
      <Flex alignItems="center" gap="0.5rem">
        <div style={{ flex: '0 0 auto' }}>
          <ProfileImage src={data.profileImageUrl} size="sm" />
        </div>
        <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
          <Typography
            size={typography.size.xs}
            style={{ lineHeight: '1.5' }}
            ellipsis
          >
            결제 금액의 {Math.round((contribution / price) * 100)}%인{' '}
            {contribution.toLocaleString()}원은
            <br />
            <span className={s.highlight}>{data.name}</span>에 후원됩니다.
          </Typography>
        </div>
      </Flex>
    </Box>
  );
};

export default DonationNotification;
