import CampaignCard from '@/components/campaign/Main/CapaignCard';
import * as style from '../../../app/foundation/[id]/detail/detail.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';

export default function CampaignTab() {
  // 임시 확인용 데이터
  const campaignData = {
    id: 1,
    name: '캠페인 제목',
    foundationName: '재단명',
    currentFundraisingAmount: 650000,
    targetFundraisingAmount: 1000000,
    titleImageUrl: 'https://via.placeholder.com/400x300',
  };

  return (
    <Box as="article" className={style.TabContainer}>
      {/* 캠페인 */}
      <Box>
        <Typography as="h3" weight="medium">
          현재 <span className={style.campaignCount}>1</span>개의 캠페인이
          진행중입니다.
        </Typography>
        <Box marginTop="1rem">
          <CampaignCard
            id={campaignData.id}
            title={campaignData.name}
            foundation={campaignData.foundationName}
            currentFundraisingAmount={campaignData.currentFundraisingAmount}
            targetFundraisingAmount={campaignData.targetFundraisingAmount}
            titleImageUrl={campaignData.titleImageUrl}
            totalCampaign={1}
            currentIndex={1}
          />
        </Box>
      </Box>
    </Box>
  );
}
