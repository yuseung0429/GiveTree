// import ProgressBar from '@/components/campaign/Main/CapaignCard/ProgressBar';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from './CampaignMoney.css';
import Button from '@/components/common/Button';
import TreeProgress from '@/components/campaign/CampaignMoney/TreeProgress';

interface CampaignMoneyProps {
  progress: number;
  currentAmount: number;
  goalAmount: number;
}

const CampaignMoney = ({
  progress,
  currentAmount,
  goalAmount,
}: CampaignMoneyProps) => {
  return (
    <div>
      <Typography
        as="h3"
        weight="bold"
        color={colorPalette.text[900]}
        className={styles.text}
      >
        모금 현황
      </Typography>
      {/* <div className={styles.progressContainer}>
        <ProgressBar progress={progress} />
        <div className={styles.amountContainer}>
          <Typography as="h5" weight="bold">
            {currentAmount}원
          </Typography>
          <Typography as="h5" weight="semiBold">
            {goalAmount}원 목표
          </Typography>
        </div>
      </div>
      <Typography
        as="h4"
        weight="semiBold"
        color={colorPalette.text[900]}
        className={styles.text}
      >
        나의 모금 내역
      </Typography> */}

    <TreeProgress currentAmount={currentAmount} goalAmount={goalAmount} progress={progress}/>

      <div className={styles.giveButton}>
        <Button fullWidth>후원하기</Button>
      </div>
    </div>
  );
};

export default CampaignMoney;
