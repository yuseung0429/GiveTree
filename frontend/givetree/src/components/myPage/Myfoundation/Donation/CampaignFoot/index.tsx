import { CampaignStatistic } from '@/api/donation/getCampaignStatistic';
import Typography from '@/components/common/Typography';
import * as s from '@/components/myPage/GiveFoot/GiveFoot.css';
import { CampaignData } from '@/types/campaign/types';
import { IoFootsteps } from 'react-icons/io5';

export default function CampaignFoot({
  campaign,
  campaignStatistics,
  currentIndex,
}: {
  campaign: CampaignData;
  campaignStatistics: Array<CampaignStatistic>;
  currentIndex: number;
}) {
  const campaignStatistic = campaignStatistics[currentIndex];

  return (
    <div className={s.footBox}>
      <div className={s.titleBox}>
        <IoFootsteps size={20} />
        <Typography as="h3" weight="semiBold">
          {campaign.name}
        </Typography>
      </div>
      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          모금 횟수
        </Typography>
        <Typography as="h4" weight="semiBold">
          {campaignStatistic.donationCount || 0}회
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          목표 금액
        </Typography>
        <Typography as="h4" weight="semiBold">
          {campaignStatistic.goalAmount?.toLocaleString() || 0}원
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          총 모금 금액
        </Typography>
        <Typography as="h4" weight="semiBold">
          {campaignStatistic.donationAmount?.toLocaleString() || 0}원
        </Typography>
      </div>
    </div>
  );
}
