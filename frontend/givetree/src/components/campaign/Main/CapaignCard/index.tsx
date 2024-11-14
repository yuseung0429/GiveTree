import ProgressBar from '@/components/campaign/Main/CapaignCard/ProgressBar';
import * as styles from './CampaignCard.css';
import Typography from '@/components/common/Typography';
import Link from 'next/link';
import colorPalette from '@/styles/tokens/colorPalette';

interface CampaignCardProps {
  id: number;
  title: string;
  foundation: string;
  currentFundraisingAmount: number;
  targetFundraisingAmount: number;
  titleImageUrl: string;
  totalCampaign: number;
  currentIndex: number;
}

const CampaignCard = ({
  id,
  title,
  foundation,
  currentFundraisingAmount = 0,
  targetFundraisingAmount = 0,
  titleImageUrl,
  totalCampaign,
  currentIndex,
}: CampaignCardProps) => {
  // 숫자 포맷팅 헬퍼 함수
  const formatAmount = (amount: number) => {
    return amount?.toLocaleString() || '0';
  };

  return (
    <Link
      href={`/campaign/${id}`}
      className={styles.campaignCard}
      style={{
        backgroundImage: `url(${titleImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <Typography
          as="h2"
          weight="semiBold"
          color={colorPalette.text[900]}
          className={styles.campaignTitle}
        >
          {title}
        </Typography>
        <div className={styles.cardIndex}>
          <Typography as="h5" weight="medium">
            {currentIndex + 1} / {totalCampaign}
          </Typography>
        </div>
        <Typography
          as="h4"
          weight="semiBold"
          color={colorPalette.text[700]}
          className={styles.campaignSubtitle}
        >
          {foundation}
        </Typography>
      </div>

      <div className={styles.progressContainer}>
        <ProgressBar
          progress={(currentFundraisingAmount / targetFundraisingAmount) * 100}
        />
        <div className={styles.amountContainer}>
          <Typography as="h5" weight="semiBold" color={colorPalette.text[900]}>
            {formatAmount(currentFundraisingAmount)}원
          </Typography>
          <Typography as="h5" weight="semiBold" color={colorPalette.text[900]}>
            {formatAmount(targetFundraisingAmount)}원 목표
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
