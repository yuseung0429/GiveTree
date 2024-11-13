import DonationChart from '@/components/foundation/detail/DonationChart';
import * as style from '../../../app/foundation/[id]/detail/detail.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Flex from '@/components/common/Flex';
import ExpenseItem from '@/components/common/ExpenseItem';
import { Foundation } from '@/api/foundation/getFoundationDetail';

interface DonationTabProps {
  foundationData: Foundation;
}

export default function DonationTab({ foundationData }: DonationTabProps) {
  return (
    <Box as="article" className={style.TabContainer}>
      {/* 나눔현황 */}
      <Box style={{ marginBottom: '3rem' }}>
        <Typography
          as="h3"
          weight="semiBold"
          size={20}
          color={colorPalette.grey[800]}
          style={{ marginBottom: '1.5rem' }}
        >
          나눔현황
        </Typography>

        {/* 도넛차트 */}
        <Box marginBottom="20px">
          <DonationChart foundationData={foundationData} />
        </Box>

        {/* 금액 보여주기 */}
        <Flex flexDirection="column" gap={10}>
          <Flex
            alignItems="end"
            justifyContent="space-between"
            className={style.moneybox}
          >
            <Typography
              weight="medium"
              color={colorPalette.grey[700]}
              size={18}
            >
              모금 금액
            </Typography>
            <Typography
              weight="semiBold"
              color={colorPalette.grey[900]}
              size={20}
            >
              {foundationData.totalFundraisingAmount} 원
            </Typography>
          </Flex>

          <Flex
            alignItems="end"
            justifyContent="space-between"
            className={style.moneybox}
          >
            <Typography
              weight="medium"
              color={colorPalette.grey[700]}
              size={18}
            >
              지출 금액
            </Typography>
            <Typography
              weight="semiBold"
              color={colorPalette.grey[900]}
              size={20}
            >
              {foundationData.executedAmount} 원
            </Typography>
          </Flex>
        </Flex>
      </Box>

      {/* 지출 보고내역 */}
      <Box>
        <Typography
          as="h3"
          weight="semiBold"
          size={20}
          color={colorPalette.grey[800]}
          style={{ marginBottom: '1rem' }}
        >
          지출 보고내역
        </Typography>

        <Flex flexDirection="column" gap={10}>
          <ExpenseItem
            borderColor={colorPalette.grey[300]}
            amountColor={colorPalette.secondary[300]}
          />
          <ExpenseItem
            borderColor={colorPalette.grey[300]}
            amountColor={colorPalette.secondary[300]}
          />
          <ExpenseItem
            borderColor={colorPalette.grey[300]}
            amountColor={colorPalette.secondary[300]}
          />
          <ExpenseItem
            borderColor={colorPalette.grey[300]}
            amountColor={colorPalette.secondary[300]}
          />
          <ExpenseItem
            borderColor={colorPalette.grey[300]}
            amountColor={colorPalette.secondary[300]}
          />
        </Flex>
      </Box>
    </Box>
  );
}
