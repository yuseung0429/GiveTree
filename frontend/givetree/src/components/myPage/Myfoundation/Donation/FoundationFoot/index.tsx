import Typography from '@/components/common/Typography';
import * as s from '@/components/myPage/GiveFoot/GiveFoot.css';
import { IoFootsteps } from 'react-icons/io5';

export default function FoundationFoot({ month }: { month: number }) {
  return (
    <div className={s.footBox}>
      <div className={s.titleBox}>
        <IoFootsteps size={20} />
        <Typography as="h3" weight="semiBold">
          {month}월의 후원 발자국
        </Typography>
      </div>
      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          정기 후원
        </Typography>
        <Typography as="h4" weight="semiBold">
          100명
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          일시 후원
        </Typography>
        <Typography as="h4" weight="semiBold">
          50명
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          총 후원 금액
        </Typography>
        <Typography as="h4" weight="semiBold">
          3,000,000원
        </Typography>
      </div>
    </div>
  );
}
