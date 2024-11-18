import * as styles from './mypage.css';
import ProfileNull from '@/assets/images/profile.png';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import colorPalette from '@/styles/tokens/colorPalette';
import Box from '@/components/common/Box';
import Profile from '@/components/myPage/Profile';
import MyTab from '@/components/myPage/MyTab';
import Link from 'next/link';
import getSessionMember from '@/api/member/getSessionMember';
import Logout from '@/components/myPage/Logout';
import fetchWrapper from '@/lib/fetchWrapper';
import { getTokenBalance } from '@/api/token/getTokenBalance';

export default async function MyPage() {
  const { balance: currentMoney } = await getTokenBalance();
  const { role, name, profileImageUrl } = await getSessionMember();
  const profileImage = profileImageUrl ? profileImageUrl : ProfileNull;
  const response = await fetchWrapper(`/donations/amount`, { method: 'GET' });
  const { amount: totalDonation } = await response.json();

  return (
    <div className={styles.Wrapper}>
      <div className={styles.mainContainer}>
        {role === 'USER' && (
          <Link className={styles.modifyButton} href={`/edit/user`}>
            <HiOutlinePencilSquare size={22} />
          </Link>
        )}
        <Box className={styles.profileConatainer}>
          <Profile
            role={role}
            name={name}
            image={profileImage}
            totalDonation={totalDonation}
            currentMoney={currentMoney}
          />
        </Box>

        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: colorPalette.primary[50],
          }}
        ></div>

        <Box className={styles.tabBox}>
          <MyTab role={role} />
        </Box>

        <div
          style={{
            width: '100%',
            height: '10px',
            margin: '0',
            backgroundColor: colorPalette.primary[50],
          }}
        ></div>

        <Box className={styles.subContainer}>
          <Logout />
        </Box>
      </div>
    </div>
  );
}
