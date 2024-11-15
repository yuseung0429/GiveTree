import Box from '@/components/common/Box';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from '../../mypage/mypage.css';
import ProfileNull from '@/assets/images/profile.png';
import Typography from '@/components/common/Typography';
import React from 'react';
import GiveFoot from '@/components/myPage/GiveFoot';
import EditUser from '@/components/myPage/Profile/EditUser';
import getSessionMember from '@/api/member/getSessionMember';
import getCampaignDonation from '@/api/donation/getCampaignDonation';
import getFoundationRegularDonation from '@/api/donation/getFoundationRegularDonation';
import getFoundationOneTimeDonation from '@/api/donation/getFoundationOneTimeDonation';
import { FoundationOneTimeDonation } from '@/types/donation/foundation/types';

export default async function UserEdit() {
  const { name, profileImageUrl, email } = await getSessionMember();
  const campaignDonation = await getCampaignDonation();
  const foundationRegularDonation = await getFoundationRegularDonation();
  const foundationDonationAll = await getFoundationOneTimeDonation();
  const foundationOneTimeDonation = foundationDonationAll.filter(
    (donation: FoundationOneTimeDonation) => {
      return donation.donationType === 'ONE_TIME';
    }
  );
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
          <GiveFoot
            name={name}
            CampaignDonation={campaignDonation}
            FoundationRegularDonation={foundationRegularDonation}
            FoundationOneTimeDonation={foundationOneTimeDonation}
          />
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
