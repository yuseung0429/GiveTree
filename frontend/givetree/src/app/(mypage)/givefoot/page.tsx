import GiveFoot from '@/components/myPage/GiveFoot';
import Box from '@/components/common/Box';
import GiveFootTab from '@/components/myPage/GiveFoot/GiveFootTab';
import getSessionMember from '@/api/member/getSessionMember';
import getCampaignDonation from '@/api/donation/getCampaignDonation';
import getFoundationRegularDonation from '@/api/donation/getFoundationRegularDonation';
import getFoundationOneTimeDonation from '@/api/donation/getFoundationOneTimeDonation';
import { FoundationOneTimeDonation } from '@/types/donation/foundation/types';
import getTotalDonation from '@/api/donation/getTotalDonation';

export default async function GiveFootPage() {
  const { name } = await getSessionMember();
  const totalDonation = await getTotalDonation();
  const campaignDonation = await getCampaignDonation();
  const foundationRegularDonation = await getFoundationRegularDonation();
  const foundationDonationAll = await getFoundationOneTimeDonation();
  const foundationOneTimeDonation = foundationDonationAll.filter(
    (donation: FoundationOneTimeDonation) => {
      return donation.donationType === 'ONE_TIME';
    }
  );


  return (
    <Box padding="1rem">
      <GiveFoot
        name={name}
        totalDonation={totalDonation}
        CampaignDonation={campaignDonation}
        FoundationRegularDonation={foundationRegularDonation}
        FoundationOneTimeDonation={foundationOneTimeDonation}
      />

      <GiveFootTab
        CampaignDonation={campaignDonation}
        FoundationRegularDonation={foundationRegularDonation}
        FoundationOneTimeDonation={foundationOneTimeDonation}
      />
    </Box>
  );
}
