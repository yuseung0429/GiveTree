import * as style from './ExpenseItem.css';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

interface ExpenseItemProps {
  date: string;
  message: string;
  amount: number;
  borderColor?: string;
  type: 'EXCHANGE' | 'CHARGE';
}

export default function ExpenseItem({
  date,
  message,
  amount,
  borderColor = colorPalette.grey[400],
  type,
}: ExpenseItemProps) {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedAmount = Math.abs(amount).toLocaleString();

  return (
    <Flex
      flexDirection="column"
      className={style.itembox}
      justifyContent="space-around"
      style={{ border: `1px solid ${borderColor}` }}
    >
      <Typography size={14}>{formattedDate}</Typography>
      <Typography weight="medium">{message}</Typography>
      <Typography
        size={18}
        weight="semiBold"
        color={
          type === 'EXCHANGE'
            ? colorPalette.primary[600]
            : colorPalette.secondary[300]
        }
        className={style.money}
      >
        {type === 'EXCHANGE' ? '출금' : '입금'} {formattedAmount}원
      </Typography>
    </Flex>
  );
}
