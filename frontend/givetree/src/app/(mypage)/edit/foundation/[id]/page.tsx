import Box from '@/components/common/Box';
import colorPalette from '@/styles/tokens/colorPalette';
import Image from 'next/image';
import * as styles from '../../../mypage/mypage.css';
import * as s from './[id].css';
import Img from '@/assets/images/profile.png';
import Typography from '@/components/common/Typography';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import React, { use } from 'react';
import FoundationInfo from '@/components/myPage/Profile/EditFoundationInfo';

export default function FoundationEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const userId = parseInt(unwrappedParams.id, 10);
  const name = '굿네이버스';
  const profileImageUrl = Img;
  const corporateRegistrationNumber = '012-34-56789';
  const phoneNumber = '010-1234-5678';
  const address = '구미 진평동';

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
              재단 회원
            </Typography>
            <Typography as="h2" weight="semiBold">
              {name}
            </Typography>
          </div>

          <div className={s.email}>
            <Typography as="h3" weight="medium">
              사업자 등록번호
            </Typography>
            <Typography as="h3" weight="medium">
              {corporateRegistrationNumber}
              {userId}
            </Typography>
          </div>

          <div className={s.email}>
            <Typography as="h3" weight="medium">
              전화번호
            </Typography>
            <Typography as="h3" weight="medium">
              {phoneNumber}
            </Typography>
          </div>
          <div className={s.email}>
            <Typography as="h3" weight="medium">
              주소
            </Typography>
            <Typography as="h3" weight="medium">
              {address}
            </Typography>
          </div>
        </Box>

        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: colorPalette.primary[50],
          }}
        ></div>

        <FoundationInfo />
      </div>
    </div>
  );
}
