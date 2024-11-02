import CampaignCard from '@/components/campaign/Main/CapaignCard';
import * as styles from './search.css';
import campaigns from '@/mock/campaigns.json';

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
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <h3 className={styles.sectionTitle}>&#39;{q}&#39;&nbsp;으로 검색한 결과</h3>
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            title={campaign.title}
            foundation={campaign.foundation}
            progress={parseInt(campaign.progress)}
            currentAmount={parseInt(campaign.currentAmount)}
            goalAmount={parseInt(campaign.goalAmount)}
            imageUrl={campaign.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
