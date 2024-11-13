import * as styles from './mypage.css';
import ProfileNull from '@/assets/images/profile.png';
import Typography from '@/components/common/Typography';
import { IoLogOutOutline } from 'react-icons/io5';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import colorPalette from '@/styles/tokens/colorPalette';
import Box from '@/components/common/Box';
import Profile from '@/components/myPage/Profile';
import MyTab from '@/components/myPage/MyTab';
import Link from 'next/link';
import fetchWrapper from '@/lib/fetchWrapper';
import { UserData } from '@/types/user/types';

export default async function MyPage() {
  const response = await fetchWrapper('/members/session', { method: 'GET' });
  const user: UserData = await response.json();
  const { role, name, profileImageUrl } = user;
  const profileImage = profileImageUrl ? profileImageUrl : ProfileNull;
  const totalDonation = 35000;

  const foundationResponse = await fetchWrapper('/foundations/session', {
    method: 'GET',
  });
  const foundation = await foundationResponse.json();

  const currentMoney =
    foundation.totalFundraisingAmount - foundation.executedAmount;

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
          <div className={styles.tab}>
            <div className={styles.IconBox}>
              <IoLogOutOutline size={20} color={colorPalette.grey[700]} />
              <Typography as="h4">로그아웃</Typography>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
