import * as style from './donation.css';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

export default function Page() {
  return (
    <Box padding="20px 15px">
      <Flex className={style.moneybox} alignItems="center">
        <Typography size={18} weight="medium">
          {' '}
          최종결제금액
        </Typography>
        <Typography
          size={20}
          weight="semiBold"
          color={colorPalette.primary[900]}
        >
          64,000원
        </Typography>
      </Flex>
    </Box>
  );
}
