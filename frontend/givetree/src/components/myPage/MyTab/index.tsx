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

interface MyTabProps {
  type: string;
}

const MyTab = ({ type }: MyTabProps) => {
  return (
    <>
      <div className={styles.tab}>
        <div className={styles.IconBox}>
          {type === '개인' ? (
            <PiHandHeart size={22} />
          ) : (
            <HiOutlinePencilSquare size={22} />
          )}
          <Typography as="h3">
            {type === '개인' ? '정기후원 내역' : '재단 소개글 등록/수정'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </div>

      <div className={styles.tab}>
        <div className={styles.IconBox}>
          {type === '개인' ? (
            <HiOutlineShoppingBag size={22} />
          ) : (
            <PiHandHeart size={22} />
          )}
          <Typography as="h3">
            {type === '개인' ? '장터 구매내역' : '캠페인 신청'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </div>

      <div className={styles.tab}>
        <div className={styles.IconBox}>
          {type === '개인' ? (
            <HiOutlineWallet size={22} />
          ) : (
            <PiListHeart size={22} />
          )}
          <Typography as="h3">
            {type === '개인' ? '간편계좌 설정' : '캠페인 내역 확인'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </div>

      <div className={styles.tab}>
        <div className={styles.IconBox}>
          {type === '개인' ? (
            <HiOutlineNewspaper size={22} />
          ) : (
            <HiOutlineWallet size={22} />
          )}
          <Typography as="h3">
            {type === '개인' ? '세액 공제 알아보기' : '출금 계좌 등록/수정'}
          </Typography>
        </div>
        <HiChevronRight size={20} />
      </div>
    </>
  );
};

export default MyTab;
