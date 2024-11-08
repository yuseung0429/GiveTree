import * as style from './ExpenseItem.css';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

type ExpenseItemProps = {
  borderColor?: string;
  amountColor?: string;
};

export default function ExpenseItem({
  borderColor = colorPalette.grey[400],
  amountColor = colorPalette.primary[600],
}: ExpenseItemProps) {
  return (
    <Flex
      flexDirection="column"
      className={style.itembox}
      justifyContent="space-around"
      style={{ border: `1px solid ${borderColor}` }}
    >
      <Typography size={14}>2024-09-23</Typography>
      <Typography weight="medium">9월 물품비</Typography>
      <Typography
        size={18}
        weight="semiBold"
        color={amountColor}
        className={style.money}
      >
        출금 300,000원
      </Typography>
    </Flex>
  );
}
