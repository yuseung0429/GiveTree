import * as styles from './main.css';
import CampaignCard from '@/components/campaign/Main/CapaignCard';
import campaigns from '@/mock/campaigns.json';

const today = new Date();
const twoWeeksLater = new Date(today);
twoWeeksLater.setDate(today.getDate() + 14);

const endingSoonCampaigns = campaigns.filter(campaign => {
  const endDate = new Date(campaign.endDate);
  return endDate <= twoWeeksLater && endDate >= today;
});

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <h3 className={styles.sectionTitle}>진행 중인 캠페인</h3>
        <div className={styles.slideContainer}>
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.title}
              foundation={campaign.foundation}
              progress={campaign.progress}
              currentAmount={campaign.currentAmount}
              goalAmount={campaign.goalAmount}
              imageUrl={campaign.imageUrl}
            />
          ))}
        </div>

        <div style={{ height: '20px' }}></div>

        <h3 className={styles.sectionTitle}>종료 임박 캠페인</h3>
        <div className={styles.slideContainer}>
          {endingSoonCampaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              id={campaign.id}
              title={campaign.title}
              foundation={campaign.foundation}
              progress={campaign.progress}
              currentAmount={campaign.currentAmount}
              goalAmount={campaign.goalAmount}
              imageUrl={campaign.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
