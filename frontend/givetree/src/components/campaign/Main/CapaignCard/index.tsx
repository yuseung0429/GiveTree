import ProgressBar from '@/components/campaign/Main/CapaignCard/ProgressBar';
import * as styles from './CampaignCard.css';
import Typography from '@/components/common/Typography';
import Link from 'next/link';

interface CampaignCardProps {
  id: number;
  title: string;
  foundation: string;
  progress: number;
  currentAmount: number;
  goalAmount: number;
  imageUrl: string;
}

const CampaignCard = ({
  id,
  title,
  foundation,
  progress,
  currentAmount,
  goalAmount,
  imageUrl,
}: CampaignCardProps) => {
  return (
    <Link
      href={`/campaign/${id}`}
      className={styles.campaignCard}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <h2 className={styles.campaignTitle}>{title}</h2>
        <h4 className={styles.campaignSubtitle}>{foundation}</h4>
      </div>

      <div className={styles.progressContainer}>
        <ProgressBar progress={progress} />
        <div className={styles.amountContainer}>
          <Typography as="h5" weight="bold">
            {currentAmount.toLocaleString()}원
          </Typography>
          <Typography as="h5" weight="semiBold">
            {goalAmount.toLocaleString()}원 목표
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
