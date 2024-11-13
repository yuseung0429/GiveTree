import CampaignItem from '@/components/myPage/Myfoundation/Campaign/CampaignItem';
import AppBar from '@/components/common/AppBar';
import Flex from '@/components/common/Flex';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import fetchWrapper from '@/lib/fetchWrapper';
import { CampaignData } from '@/types/campaign/types';
import Typography from '@/components/common/Typography';

export default async function Page() {
  const foundationResponse = await fetchWrapper('/foundations/session', {
    method: 'GET',
  });
  const foundation = await foundationResponse.json();
  const foundationId = foundation.id;

  const response = await fetchWrapper('/campaigns', { method: 'GET' });
  const campaignList = await response.json();
  const campaigns = campaignList.content;

  const foundationCampaigns = campaigns.filter((campaign: CampaignData) => {
    return campaign.foundationId === foundationId;
  });

  return (
    <Layout>
      <header>
        <AppBar title="캠페인 내역 확인" />
      </header>
      <main style={{ backgroundColor: '#fff', padding: '1rem 0' }}>
        {foundationCampaigns.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <Typography as="h3" weight="semiBold">
              진행 중인 캠페인이 없습니다.
            </Typography>
          </div>
        ) : (
          <Flex flexDirection="column" gap="1rem">
            <Typography as="h3" weight="medium" style={{ margin: '0 1rem' }}>
              <b>{foundationCampaigns.length}개</b>의 캠페인을 진행 중입니다.
            </Typography>
            {foundationCampaigns.map((campaign: CampaignData) => (
              <>
                <CampaignItem
                  id={campaign.id}
                  name={campaign.name}
                  startDate={campaign.startDate}
                  endDate={campaign.endDate}
                  targetFundraisingAmount={campaign.targetFundraisingAmount}
                  currentFundraisingAmount={campaign.currentFundraisingAmount}
                  titleImageUrl={campaign.titleImageUrl}
                />
              </>
            ))}
          </Flex>
        )}
      </main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
