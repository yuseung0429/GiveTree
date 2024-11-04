import { ReactNode } from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
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
        <HiOutlineBell color="#fff" size={24}/>
      </div>
    </div>
  );
};

export default MainAppBar;
