// import ProgressBar from '@/components/campaign/Main/CapaignCard/ProgressBar';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from './CampaignMoney.css';
import Button from '@/components/common/Button';
import TreeProgress from '@/components/campaign/CampaignMoney/TreeProgress';
import Link from 'next/link';

interface CampaignMoneyProps {
  id: number;
  currentAmount: number;
  goalAmount: number;
}

const CampaignMoney = ({
  id,
  currentAmount,
  goalAmount,
}: CampaignMoneyProps) => {
  return (
    <div>
      <Typography
        as="h3"
        weight="semiBold"
        color={colorPalette.text[700]}
        className={styles.text}
      >
        모금 현황
      </Typography>

      <TreeProgress currentAmount={currentAmount} goalAmount={goalAmount} />

      <Link className={styles.giveButton} href={`/campaign/${id}/donation`}>
        <Button fullWidth>후원하기</Button>
      </Link>
    </div>
  );
};

export default CampaignMoney;
