import CampaignCard from '@/components/campaign/Main/CapaignCard';
import * as styles from './search.css';
// import campaigns from '@/mock/campaigns.json';
import Typography from '@/components/common/Typography';
import { CampaignData } from '@/types/campaign/types';
import fetchWrapper from '@/lib/fetchWrapper';
import colorPalette from '@/styles/tokens/colorPalette';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const response = await fetchWrapper('/campaigns', { method: 'GET' });
  const campaignList = await response.json();
  const campaigns = campaignList.content;
  const { q } = await searchParams;
  const filteredCampaigns = campaigns.filter((campaign: CampaignData) => {
    const query = q.toLowerCase() || '';
    return (
      campaign.name.toLowerCase().includes(query) ||
      campaign.foundationName.toLowerCase().includes(query) ||
      campaign.introduction.toLowerCase().includes(query)
    );
  });

  return (
    <div className={styles.Wrapper}>
      <div className={styles.mainContainer}>
        <Typography as="h3" weight="semiBold" className={styles.sectionTitle}>
          <Typography
            weight="semiBold"
            color={colorPalette.primary[500]}
            style={{ display: 'inline-block' }}
          >
            {filteredCampaigns.length}개
          </Typography>
          의 캠페인이 검색되었습니다.
        </Typography>
        {filteredCampaigns.map((campaign: CampaignData, index: number) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            title={campaign.name}
            foundation={campaign.foundationName}
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
