import Typography from '@/components/common/Typography';
import * as s from '@/components/myPage/GiveFoot/GiveFoot.css';
import { IoFootsteps } from 'react-icons/io5';

export default function CampaignFoot() {
  return (
    <div className={s.footBox}>
      <div className={s.titleBox}>
        <IoFootsteps size={20} />
        <Typography as="h3" weight="semiBold">
          희망 나눔 캠페인
        </Typography>
      </div>
      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          모금 횟수
        </Typography>
        <Typography as="h4" weight="semiBold">
          100회
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          목표 금액
        </Typography>
        <Typography as="h4" weight="semiBold">
          3,000,000원
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          총 모금 금액
        </Typography>
        <Typography as="h4" weight="semiBold">
          1,500,000원
        </Typography>
      </div>
    </div>
  );
}
