import colorPalette from '@/styles/tokens/colorPalette';
import { FaTree, FaRegBell } from 'react-icons/fa';
import * as styles from './Title.css';
import Typography from '@/components/common/Typography';

const Titile = () => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <FaTree color={colorPalette.primary[900]} size={24} />
        <Typography as='h2' color='#fff' weight='semiBold'>GIVE</Typography>
      </div>
      <div className={styles.rightSection}>
        <FaRegBell color="#fff" size={22} />
      </div>
    </div>
  );
};

export default Titile;
