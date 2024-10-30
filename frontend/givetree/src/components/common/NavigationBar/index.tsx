import Link from 'next/link';
import * as styles from './NavigationBar.css';
import Typography from '@/components/common/Typography';
import {
  HiHome,
  HiBuildingLibrary,
  HiShoppingBag,
  HiUserCircle,
} from 'react-icons/hi2';
import { FaTree } from 'react-icons/fa';
import Image from 'next/image';
import decoBar from '@/assets/images/decoBar.png';

const NavigationBar = () => {
  return (
    <div className={styles.container}>
      <Image src={decoBar} alt="Deco Bar" className={styles.decoImage} />
      <div className={styles.bar}>
        <Link href="/signup" className={styles.item}>
          <div className={styles.iconWrapper}>
            <HiHome size={24} />
          </div>
          <Typography>메인</Typography>
        </Link>
        <Link href="/signup" className={styles.item}>
          <div className={styles.iconWrapper}>
            <HiBuildingLibrary size={24} />
          </div>
          <Typography>재단</Typography>
        </Link>
        <Link href="/signup" className={styles.item}>
          <div
            className={styles.iconWrapper}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <FaTree size={40} />
          </div>
        </Link>
        <Link href="/signup" className={styles.item}>
          <div className={styles.iconWrapper}>
            <HiShoppingBag size={24} />
          </div>
          <Typography>거래</Typography>
        </Link>
        <Link href="/signup" className={styles.item}>
          <div className={styles.iconWrapper}>
            <HiUserCircle size={24} />
          </div>
          <Typography>마이</Typography>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
