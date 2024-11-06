import { ReactNode } from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import * as styles from './MainAppBar.css';
import Typography from '@/components/common/Typography';
import Link from 'next/link';
import typography from '@/styles/tokens/typography';

interface AppBarProps {
  children: ReactNode;
}

const MainAppBar = ({ children }: AppBarProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <Typography
          as="h2"
          size={typography.size.xl}
          color="#fff"
          weight="semiBold"
        >
          {children}
        </Typography>
      </div>
      <Link className={styles.rightSection} href={'/alarm'}>
        <HiOutlineBell color="#fff" size={24} />
      </Link>
    </div>
  );
};

export default MainAppBar;
