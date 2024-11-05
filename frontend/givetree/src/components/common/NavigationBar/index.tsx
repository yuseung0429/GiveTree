'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const NavigationBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.container}>
      <Image
        src="/images/decoBar.png"
        width={800}
        height={12}
        alt="Deco Bar"
        className={styles.decoImage}
      />
      <div className={styles.bar}>
        <Link
          href="/main"
          className={`${styles.item} ${isActive('/main') ? 'active' : ''}`}
        >
          <div className={styles.iconWrapper}>
            <HiHome size={24} />
          </div>
          <Typography className={styles.textWrapper}>메인</Typography>
        </Link>
        <Link
          href="/foundation"
          className={`${styles.item} ${
            isActive('/foundation') ? 'active' : ''
          }`}
        >
          <div className={styles.iconWrapper}>
            <HiBuildingLibrary size={24} />
          </div>
          <Typography className={styles.textWrapper}>재단</Typography>
        </Link>
        <Link
          href="/tree/1"
          className={`${styles.item} ${isActive('/tree/1') ? 'active' : ''}`}
        >
          <div
            className={styles.treeIconWrapper}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <FaTree size={30} />
          </div>
        </Link>
        <Link
          href="/signin"
          className={`${styles.item} ${isActive('/signin') ? 'active' : ''}`}
        >
          <div className={styles.iconWrapper}>
            <HiShoppingBag size={24} />
          </div>
          <Typography className={styles.textWrapper}>거래</Typography>
        </Link>
        <Link
          href="/mypage"
          className={`${styles.item} ${isActive('/mypage') ? 'active' : ''}`}
        >
          <div className={styles.iconWrapper}>
            <HiUserCircle size={24} />
          </div>
          <Typography className={styles.textWrapper}>마이</Typography>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
