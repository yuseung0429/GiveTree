import * as styles from './main.css';
import CampaignCard from '@/components/campaign/Main/CapaignCard';
import Typography from '@/components/common/Typography';
import fetchWrapper from '@/lib/fetchWrapper';
import { CampaignData } from '@/types/campaign/types';

// import campaigns from '@/mock/campaigns.json';

export default async function Home() {
  const response = await fetchWrapper('/campaigns', { method: 'GET' });
  const campaignList = await response.json();
  const campaigns = campaignList.content;

  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  const endingSoonCampaigns = campaigns.filter((campaign: CampaignData) => {
    const endDate = new Date(campaign.endDate);
    return endDate <= twoWeeksLater && endDate >= today;
  });

  const progressCampaigns = campaigns.filter((campaign: CampaignData) => {
    const endDate = new Date(campaign.endDate);
    return endDate >= today;
  });

  console.log(progressCampaigns);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <Typography as="h3" weight="semiBold" className={styles.sectionTitle}>
          진행 중인 캠페인
        </Typography>
        <div className={styles.slideContainer}>
          {campaigns.map((campaign: CampaignData, index: number) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.name}
              foundation={campaign.foundationName}
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
          {endingSoonCampaigns.map((campaign: CampaignData, index: number) => (
            <CampaignCard
              key={index}
              id={campaign.id}
              title={campaign.name}
              foundation={campaign.foundationName}
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
