import Typography from '@/components/common/Typography';
import { IoFootsteps } from 'react-icons/io5';
import * as s from './GiveFoot.css';
import {
  FoundationOneTimeDonation,
  FoundationRegularDonation,
} from '@/types/donation/foundation/types';
import { CampaignDonation } from '@/types/donation/campaign/types';

interface GiveFootProps {
  name: string;
  totalDonation: number;
  CampaignDonation: CampaignDonation[];
  FoundationRegularDonation: FoundationRegularDonation[];
  FoundationOneTimeDonation: FoundationOneTimeDonation[];
}

export default function GiveFoot({
  name,
  totalDonation,
  CampaignDonation,
  FoundationRegularDonation,
  FoundationOneTimeDonation,
}: GiveFootProps) {
  return (
    <div className={s.footBox}>
      <div className={s.titleBox}>
        <IoFootsteps size={20} />
        <Typography as="h3" weight="semiBold">
          {name} 님의 기부 발자국
        </Typography>
      </div>
      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          정기 후원
        </Typography>
        <Typography as="h4" weight="semiBold">
          {FoundationRegularDonation.length}개
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          일시 후원
        </Typography>
        <Typography as="h4" weight="semiBold">
          {FoundationOneTimeDonation.length + CampaignDonation.length}회
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          총 후원 금액
        </Typography>
        <Typography as="h4" weight="semiBold">
          {totalDonation.toLocaleString()}원
        </Typography>
      </div>
    </div>
  );
}
