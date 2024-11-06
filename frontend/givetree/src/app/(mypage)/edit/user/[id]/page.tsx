import Box from '@/components/common/Box';
import colorPalette from '@/styles/tokens/colorPalette';
import Image from 'next/image';
import * as styles from '../../../mypage/mypage.css';
import * as s from './[id].css';
import Img from '@/assets/images/profile.png';
import Typography from '@/components/common/Typography';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import React, { use } from 'react';
import GiveFoot from '@/components/myPage/GiveFoot';
import EditUserName from '@/components/myPage/Profile/EditUserName';

export default function UserEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const userId = parseInt(unwrappedParams.id, 10);
  const name = '눈사람';
  const profileImageUrl = Img;
  const email = 'ssafy123@naver.com';

  return (
    <div className={styles.Wrapper}>
      <div className={styles.mainContainer}>
        <div className={s.changeImage}>
          <HiOutlinePlusCircle size={28} />
        </div>
        <Box className={styles.profileConatainer}>
          <Image
            src={profileImageUrl}
            alt="profile Image"
            width={130}
            height={130}
            className={styles.profileImg}
          />
          <EditUserName email={email} />
        </Box>

        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: colorPalette.primary[50],
          }}
        ></div>

        <Box className={s.introduceBox}>
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
            {userId}번째 GIVE TREE 회원입니다.
          </Typography>
        </Box>
      </div>
    </div>
  );
}
