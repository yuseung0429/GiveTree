import CampaignCard from '@/components/campaign/Main/CapaignCard';
import * as styles from './search.css';
import campaigns from '@/mock/campaigns.json';
import Typography from '@/components/common/Typography';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const filteredCampaigns = campaigns.filter((campaign) => {
    const query = q.toLowerCase() || '';
    return (
      campaign.title.toLowerCase().includes(query) ||
      campaign.foundation.toLowerCase().includes(query) ||
      campaign.introduction.toLowerCase().includes(query)
    );
  });

  return (
    <div className={styles.Wrapper}>
      <div className={styles.mainContainer}>
        <Typography as="h3" weight="semiBold" className={styles.sectionTitle}>
          &#39;{q}&#39;&nbsp;으로 검색한 결과
        </Typography>
        {filteredCampaigns.map((campaign, index) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            title={campaign.title}
            foundation={campaign.foundation}
            progress={campaign.progress}
            currentFundraisingAmount={campaign.currentFundraisingAmount}
            targetFundraisingAmount={campaign.targetFundraisingAmount}
            titleImageUrl={campaign.titleImageUrl}
            totalCampaign={filteredCampaigns.length}
            currentIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
