import Typography from '@/components/common/Typography';
import {
  HiChevronRight,
  HiOutlineNewspaper,
  HiOutlineShoppingBag,
  HiOutlineWallet,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';
import { PiHandHeart, PiListHeart } from 'react-icons/pi';
import * as styles from './MyTab.css';
import Link from 'next/link';
import fetchWrapper from '@/lib/fetchWrapper';

interface MyTabProps {
  role: string;
}

export default async function MyTab({ role }: MyTabProps) {
  const foundationResponse = await fetchWrapper('/foundations/session', {
    method: 'GET',
  });
  const foundation = await foundationResponse.json();
  const foundationId = foundation.id;

  return (
    <>
      <Link
        className={styles.tab}
        href={role === 'USER' ? '/donationusage' : '/edit/foundation'}
      >
        <div className={styles.IconBox}>
          {role === 'USER' ? (
            <PiHandHeart size={22} />
          ) : (
            <HiOutlinePencilSquare size={22} />
          )}
          <Typography as="h3">
            {role === 'USER' ? '기부금 사용 내역' : '재단 소개 수정'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </Link>

      <Link
        className={styles.tab}
        href={role === 'USER' ? '' : `myfoundation/campaign/register/${foundationId}`}
      >
        <div className={styles.IconBox}>
          {role === 'USER' ? (
            <HiOutlineShoppingBag size={22} />
          ) : (
            <PiHandHeart size={22} />
          )}
          <Typography as="h3">
            {role === 'USER' ? '장터 거래 내역' : '캠페인 신청'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </Link>

      <Link
        className={styles.tab}
        href={role === 'USER' ? '/account' : `myfoundation/campaign`}
      >
        <div className={styles.IconBox}>
          {role === 'USER' ? (
            <HiOutlineWallet size={22} />
          ) : (
            <PiListHeart size={22} />
          )}
          <Typography as="h3">
            {role === 'USER' ? '간편계좌 설정' : '캠페인 내역 확인'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </Link>

      <Link className={styles.tab} href={role === 'USER' ? '/tax' : `/account`}>
        <div className={styles.IconBox}>
          {role === 'USER' ? (
            <HiOutlineNewspaper size={22} />
          ) : (
            <HiOutlineWallet size={22} />
          )}
          <Typography as="h3">
            {role === 'USER' ? '세액공제 알아보기' : '출금계좌 설정'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </Link>
    </>
  );
}
