import colorPalette from '@/styles/tokens/colorPalette';
import { FaTree } from 'react-icons/fa';
import { HiOutlineBell } from 'react-icons/hi2';
import * as styles from './Title.css';
import Typography from '@/components/common/Typography';
import Link from 'next/link';

const Titile = () => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <FaTree color={colorPalette.primary[900]} size={24} />
        <Typography as="h2" color="#fff" weight="semiBold">
          GIVE
        </Typography>
      </div>
      <Link className={styles.rightSection} href={'/alarm'}>
        <HiOutlineBell color="#fff" size={24} />
      </Link>
    </div>
  );
};

export default Titile;
