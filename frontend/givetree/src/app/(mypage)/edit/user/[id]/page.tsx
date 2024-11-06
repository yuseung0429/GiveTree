'use client';

import Box from '@/components/common/Box';
import colorPalette from '@/styles/tokens/colorPalette';
import Image from 'next/image';
import * as styles from '../../../mypage/mypage.css';
import * as s from './[id].css';
import Img from '@/assets/images/profile.png';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import React, { useState } from 'react';
import GiveFoot from '@/components/myPage/GiveFoot';

export default function UserEdit({
  params: { userId },
}: {
  params: { userId: number };
}) {
  const [name, setName] = useState<string>('눈사람');
  const id = userId;
  const profileImageUrl = Img;
  const email = 'ssafy123@naver.com';

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
          <div className={s.name}>
            <Typography as="h5" color={colorPalette.primary[700]}>
              GIVE 회원
            </Typography>
            <div className={s.inputBox}>
              <input
                type="text"
                style={{ textAlign: 'center' }}
                value={name}
                onChange={handleNameChange}
                className={s.nameInput}
                placeholder={name}
              />
            </div>
          </div>

          <div className={s.email}>
            <Typography as="h3" weight="medium">
              이메일
            </Typography>
            <Typography as="h3" weight="medium">
              {email}
            </Typography>
          </div>

          <div className={s.modifyButton}>
            <Button variant="outlined" fullWidth>
              수정하기
            </Button>
          </div>
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
            GIVE TREE 회원이 되신 것을 환영합니다.
          </Typography>
        </Box>
      </div>
    </div>
  );
}
