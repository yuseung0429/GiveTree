import Box from '@/components/common/Box';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from '../../mypage/mypage.css';
import Img from '@/assets/images/profile.png';
import Typography from '@/components/common/Typography';
import React from 'react';
import GiveFoot from '@/components/myPage/GiveFoot';
import EditUser from '@/components/myPage/Profile/EditUser';

export default function UserEdit() {
  const name = '눈사람';
  const profileImageUrl = Img;
  const email = 'ssafy123@naver.com';

  return (
    <div className={styles.Wrapper}>
      <div className={styles.mainContainer}>
        <EditUser email={email} image={profileImageUrl} />

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
