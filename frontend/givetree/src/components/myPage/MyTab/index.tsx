import getSessionFoundation from '@/api/member/getSessionFoundation';
import Typography from '@/components/common/Typography';
import Link from 'next/link';
import {
  HiChevronRight,
  HiOutlineClipboardDocumentList,
  HiOutlineNewspaper,
  HiOutlinePencilSquare,
  HiOutlineWallet,
  HiLink,
} from 'react-icons/hi2';
import { PiHandHeart, PiListHeart } from 'react-icons/pi';
import * as styles from './MyTab.css';

interface MyTabProps {
  role: string;
}

export default async function MyTab({ role }: MyTabProps) {
  const { id: foundationId } = await getSessionFoundation();

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
        href={
          role === 'USER'
            ? '/mytransaction/0'
            : `myfoundation/campaign/register/${foundationId}`
        }
      >
        <div className={styles.IconBox}>
          {role === 'USER' ? (
            <HiOutlineClipboardDocumentList size={22} />
          ) : (
            <PiHandHeart size={22} />
          )}
          <Typography as="h3">
            {role === 'USER' ? '입출금 내역' : '캠페인 신청'}
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
      <Link
        className={styles.tab}
        href={
          role === 'USER'
            ? 'http://givetree-chain.kro.kr/txs'
            : `http://givetree-chain.kro.kr/txs`
        }
      >
        <div className={styles.IconBox}>
          {role === 'USER' ? <HiLink size={22} /> : <HiLink size={22} />}
          <Typography as="h3">
            {role === 'USER' ? '블록 탐색' : '블록 탐색'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </Link>
    </>
  );
}
