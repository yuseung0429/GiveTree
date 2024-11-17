import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as s from './Usage.css';
import typography from '@/styles/tokens/typography';
import { DonationExpenseItem } from '@/api/donation/getDonationExpense';

export default function Usage({
  expenses,
}: {
  expenses: DonationExpenseItem[] | [];
}) {
  return (
    <>
      {expenses.length !== 0 ? (
        expenses.map((detail) => {
          <Box className={s.usageBox}>
            <Typography color={colorPalette.grey[800]}>
              {detail.createdAt.slice(0, 10)}
            </Typography>
            <Typography as="h3" weight="semiBold">
              {detail.message}
            </Typography>
            <Typography
              as="h3"
              weight="semiBold"
              size={typography.size.lg}
              color={colorPalette.secondary[600]}
              style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
            >
              {detail.amount.toLocaleString()}원
            </Typography>
          </Box>;
        })
      ) : (
        <Box className={s.noneUsageBox}>
          <Typography as="h4">재단에서 출금한 내역이 없습니다.</Typography>
        </Box>
      )}
    </>
  );
}
