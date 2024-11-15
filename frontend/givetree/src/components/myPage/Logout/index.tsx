'use client';

import Typography from '@/components/common/Typography';
import { IoLogOutOutline } from 'react-icons/io5';
import * as styles from './Logout.css';
import colorPalette from '@/styles/tokens/colorPalette';
import signout from '@/actions/auth/signout';
import useDialog from '@/hooks/useDialog';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  const { confirm } = useDialog();

  const handleClick = async () => {
    if (!(await confirm('로그아웃 하시겠습니까?'))) {
      return;
    }

    await signout();
    router.push('/signin');
  };

  return (
    <div className={styles.tab} onClick={handleClick}>
      <div className={styles.IconBox}>
        <IoLogOutOutline size={20} color={colorPalette.grey[700]} />
        <Typography as="h4">로그아웃</Typography>
      </div>
    </div>
  );
}
