import Box from '@/components/common/Box';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from '../../mypage/mypage.css';
import ProfileNull from '@/assets/images/profile.png';
import Typography from '@/components/common/Typography';
import React from 'react';
import GiveFoot from '@/components/myPage/GiveFoot';
import EditUser from '@/components/myPage/Profile/EditUser';
import getSessionMember from '@/api/member/getSessionMember';

export default async function UserEdit() {
  const { name, profileImageUrl, email } = await getSessionMember();
  const profileImage = profileImageUrl ? profileImageUrl : ProfileNull;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.mainContainer}>
        <EditUser name={name} email={email} image={profileImage} />

        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: colorPalette.primary[50],
          }}
        ></div>

        <Box className={styles.introduceBox}>
          <GiveFoot name={name} />
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
          <Typography as="h3" weight="medium">
            GIVE TREE 회원이 되신 것을 환영합니다.
          </Typography>
        </Box>
      </div>
    </div>
  );
}
