'use  client';

import CampaignCard from '@/components/campaign/Main/CapaignCard';
import * as style from '../../../app/foundation/[id]/detail/detail.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import { Foundation } from '@/api/foundation/getFoundationDetail';
import useSearchCampaigns from '@/api/foundation/useSearchCampaign';
import Flex from '@/components/common/Flex';
import colorPalette from '@/styles/tokens/colorPalette';
import { FaTree } from 'react-icons/fa';

interface CampaignTabProps {
  foundationData: Foundation;
}

export default function CampaignTab({ foundationData }: CampaignTabProps) {
  const { data: campaignSearchData } = useSearchCampaigns({
    foundationName: foundationData.name,
  });

  const campaigns = campaignSearchData?.content || [];
  const totalCampaigns = campaigns.length;

  return (
    <Box as="article" className={style.TabContainer}>
      {/* 캠페인 */}
      <Box>
        <Typography as="h4" size={18} weight="medium">
          현재{' '}
          <span className={style.campaignCount}>
            {foundationData.holdingCampaignCount}
          </span>
          개의 캠페인이 진행중입니다.
        </Typography>
        <Box marginTop="1rem">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.name}
              foundation={campaign.foundationName}
              currentFundraisingAmount={campaign.currentFundraisingAmount}
              targetFundraisingAmount={campaign.targetFundraisingAmount}
              titleImageUrl={campaign.titleImageUrl}
              totalCampaign={totalCampaigns}
              currentIndex={index}
            />
          ))}
          {campaigns.length === 0 && (
            <Flex
              gap={8}
              alignItems="center"
              justifyContent="center"
              style={{
                minHeight: '320px',
                backgroundColor: colorPalette.grey[200],
                borderRadius: '10px',
              }}
            >
              <FaTree color={colorPalette.primary[500]} size={20} />
              <Typography weight="medium">
                진행중인 캠페인이 없습니다.
              </Typography>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
}
