import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from '../../../mypage/mypage.css';
import Img from '@/assets/images/profile.png';
import React, { use } from 'react';
import FoundationIntroduce from '@/components/myPage/Profile/EditFoundation/Introduce';
import FoundationInfo from '@/components/myPage/Profile/EditFoundation/Information';

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
  console.log(userId);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.mainContainer}>
        <FoundationInfo
          image={profileImageUrl}
          name={name}
          corporateRegistrationNumber={corporateRegistrationNumber}
          phoneNumber={phoneNumber}
          address={address}
        />

        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: colorPalette.primary[50],
          }}
        ></div>

        <FoundationIntroduce />
      </div>
    </div>
  );
}
