import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import * as s from './DonationUsage.css';

import Box from '@/components/common/Box';

export default function NoneDonation() {
  return (
    <>
      <div className={s.sliderContainer}>
        <Flex flexDirection="column" className={s.noneContainer}>
          <Typography as="h3">후원한 재단이 없습니다.</Typography>
        </Flex>
      </div>

      <Box paddingTop="1rem" marginTop="1rem"></Box>
    </>
  );
}
