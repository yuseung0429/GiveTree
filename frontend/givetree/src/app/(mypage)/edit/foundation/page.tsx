import * as styles from '../../mypage/mypage.css';
import ProfileNull from '@/assets/images/profile.png';
import React from 'react';
import FoundationInfo from '@/components/myPage/Profile/EditFoundation/Information';
import getSessionFoundation from '@/api/member/getSessionFoundation';

export default async function FoundationEdit() {
  const {
    name,
    introduction,
    address,
    phoneNumber,
    corporateRegistrationNumber,
    profileImageUrl,
  } = await getSessionFoundation();

  const profileImage = profileImageUrl ? profileImageUrl : ProfileNull;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.mainContainer}>
        <FoundationInfo
          image={profileImage}
          name={name}
          introduction={introduction}
          corporateRegistrationNumber={corporateRegistrationNumber}
          phoneNumber={phoneNumber}
          address={address}
        />
      </div>
    </div>
  );
}
