import * as styles from '../Donation.css';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

export default function DonationCash({ amount }: { amount: number }) {
  return (
    <Box paddingTop="1.5rem">
      <Flex className={styles.moneybox} alignItems="center">
        <Typography size={18} weight="medium">
          {' '}
          최종결제금액
        </Typography>
        <Typography
          size={20}
          weight="semiBold"
          color={colorPalette.primary[900]}
        >
          {amount.toLocaleString()}원
        </Typography>
      </Flex>
    </Box>
  );
}
