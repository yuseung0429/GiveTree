import * as styles from '../../mypage/mypage.css';
import ProfileNull from '@/assets/images/profile.png';
import React from 'react';
import FoundationInfo from '@/components/myPage/Profile/EditFoundation/Information';
import fetchWrapper from '@/lib/fetchWrapper';

export default async function FoundationEdit() {
  const foundationResponse = await fetchWrapper('/foundations/session', {
    method: 'GET',
  });
  const foundation = await foundationResponse.json();

  const {
    name,
    introduction,
    address,
    phoneNumber,
    corporateRegistrationNumber,
    profileImageUrl,
  } = foundation;

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
