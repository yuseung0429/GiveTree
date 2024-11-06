import Typography from '@/components/common/Typography';
import { IoFootsteps } from 'react-icons/io5';
import * as s from './GiveFoot.css';

interface GiveFootProps {
  name: string;
}

export default function GiveFoot({ name }: GiveFootProps) {
  return (
    <div className={s.footBox}>
      <div className={s.titleBox}>
        <IoFootsteps size={22} />
        <Typography as="h3" weight="semiBold">
          {name} 님의 기부 발자국
        </Typography>
      </div>
      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          정기 후원 참여
        </Typography>
        <Typography as="h4" weight="semiBold">
          1개
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          캠페인 후원 참여
        </Typography>
        <Typography as="h4" weight="semiBold">
          3개
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
