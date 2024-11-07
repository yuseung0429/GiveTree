import Typography from '@/components/common/Typography';
import { IoFootsteps } from 'react-icons/io5';
import * as s from './GiveFoot.css';
import CampaignDonation from '@/mock/CampaignDonation.json';
import FoundationDonation from '@/mock/FoundationDonation.json';

interface GiveFootProps {
  name: string;
}

export default function GiveFoot({ name }: GiveFootProps) {
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
          {FoundationDonation.regularDonations.length}개
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          일시 후원
        </Typography>
        <Typography as="h4" weight="semiBold">
          {FoundationDonation.oneTimeDonations.length + CampaignDonation.length}
          회
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          총 후원 금액
        </Typography>
        <Typography as="h4" weight="semiBold">
          233,000원
        </Typography>
      </div>
    </div>
  );
}
