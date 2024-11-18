'use client';

import Link from 'next/link';
import * as styles from '../NavigationBar.css';
import Typography from '@/components/common/Typography';
import {
  HiHome,
  HiBuildingLibrary,
  HiWallet,
  HiShoppingBag,
  HiUserCircle,
} from 'react-icons/hi2';
import { FaTree } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function NavigationBarItem({ role }: { role: string }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
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
        className={`${styles.item} ${isActive('/foundation') ? 'active' : ''}`}
      >
        <div className={styles.iconWrapper}>
          <HiBuildingLibrary size={24} />
        </div>
        <Typography className={styles.textWrapper}>재단</Typography>
      </Link>

      <Link
        href="/tree/0/0"
        className={`${styles.item} ${isActive('/tree/0/0') ? 'active' : ''}`}
      >
        <div
          className={styles.treeIconWrapper}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <FaTree size={30} />
        </div>
      </Link>

      {role === 'USER' ? (
        <Link
          href="/market"
          className={`${styles.item} ${isActive('/market') ? 'active' : ''}`}
        >
          <div className={styles.iconWrapper}>
            <HiShoppingBag size={24} />
          </div>
          <Typography className={styles.textWrapper}>거래</Typography>
        </Link>
      ) : (
        <Link
          href="/wallet"
          className={`${styles.item} ${isActive('/wallet') ? 'active' : ''}`}
        >
          <div className={styles.iconWrapper}>
            <HiWallet size={24} />
          </div>
          <Typography className={styles.textWrapper}>지갑</Typography>
        </Link>
      )}

      <Link
        href="/mypage"
        className={`${styles.item} ${isActive('/mypage') ? 'active' : ''}`}
      >
        <div className={styles.iconWrapper}>
          <HiUserCircle size={24} />
        </div>
        <Typography className={styles.textWrapper}>마이</Typography>
      </Link>
    </>
  );
}
