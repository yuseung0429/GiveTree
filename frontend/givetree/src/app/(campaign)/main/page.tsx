import * as styles from './main.css';
import CampaignCard from '@/components/campaign/Main/CapaignCard';
import Typography from '@/components/common/Typography';

import campaigns from '@/mock/campaigns.json';

const today = new Date();
const twoWeeksLater = new Date(today);
twoWeeksLater.setDate(today.getDate() + 14);

const endingSoonCampaigns = campaigns.filter((campaign) => {
  const endDate = new Date(campaign.endDate);
  return endDate <= twoWeeksLater && endDate >= today;
});

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <Typography as="h3" weight="semiBold" className={styles.sectionTitle}>
          진행 중인 캠페인
        </Typography>
        <div className={styles.slideContainer}>
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.title}
              foundation={campaign.foundation}
              progress={campaign.progress}
              currentFundraisingAmount={campaign.currentFundraisingAmount}
              targetFundraisingAmount={campaign.targetFundraisingAmount}
              titleImageUrl={campaign.titleImageUrl}
              totalCampaign={campaigns.length}
              currentIndex={index}
            />
          ))}
        </div>

        <div style={{ height: '20px' }}></div>

        <Typography as="h3" weight="semiBold" className={styles.sectionTitle}>
          종료 임박 캠페인
        </Typography>
        <div className={styles.slideContainer}>
          {endingSoonCampaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              id={campaign.id}
              title={campaign.title}
              foundation={campaign.foundation}
              progress={campaign.progress}
              currentFundraisingAmount={campaign.currentFundraisingAmount}
              targetFundraisingAmount={campaign.targetFundraisingAmount}
              titleImageUrl={campaign.titleImageUrl}
              totalCampaign={endingSoonCampaigns.length}
              currentIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
