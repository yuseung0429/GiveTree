import { ReactNode } from 'react';
import { FaRegBell } from 'react-icons/fa';
import * as styles from './MainAppBar.css';
import Typography from '@/components/common/Typography';

interface AppBarProps {
  children: ReactNode;
}

const MainAppBar = ({ children }: AppBarProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <Typography as="h3" color="#fff" weight="semiBold">
          {children}
        </Typography>
      </div>
      <div className={styles.rightSection}>
        <FaRegBell color="#fff" size={22} />
      </div>
    </div>
  );
};

export default MainAppBar;
