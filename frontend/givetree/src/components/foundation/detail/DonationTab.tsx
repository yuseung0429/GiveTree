import DonationChart from '@/components/foundation/detail/DonationChart';
import * as style from '../../../app/foundation/[id]/detail/detail.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';

export default function DonationTab() {
  const collectedAmount = 100000; // 모금 금액
  const spentAmount = 75000; // 지출 금액

  return (
    <Box as="article" className={style.TabContainer}>
      {/* 모금함 */}
      <Box>
        <Typography as="h3" weight="medium">
          나눔현황
        </Typography>
        <Box>
          <DonationChart
            collectedAmount={collectedAmount}
            spentAmount={spentAmount}
          />
        </Box>
      </Box>
    </Box>
  );
}
