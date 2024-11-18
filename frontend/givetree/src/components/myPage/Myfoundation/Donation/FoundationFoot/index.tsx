import { FoundationStatistic } from '@/api/donation/getFoundationStatistic';
import Typography from '@/components/common/Typography';
import * as s from '@/components/myPage/GiveFoot/GiveFoot.css';
import { IoFootsteps } from 'react-icons/io5';

export default function FoundationFoot({
  month,
  statistics,
}: {
  month: number;
  statistics: Array<FoundationStatistic[]>;
}) {
  const statistic = statistics[month - 1][0];

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
          {statistic.regularSubscriptionCount || 0}명
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          일시 후원
        </Typography>
        <Typography as="h4" weight="semiBold">
          {statistic.donationCount || 0}회
        </Typography>
      </div>

      <div className={s.contentBox}>
        <Typography as="h4" weight="medium">
          총 후원 금액
        </Typography>
        <Typography as="h4" weight="semiBold">
          {statistic.donationAmount?.toLocaleString() || 0}원
        </Typography>
      </div>
    </div>
  );
}
