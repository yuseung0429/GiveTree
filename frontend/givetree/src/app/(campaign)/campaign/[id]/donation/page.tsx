import Account from '@/components/common/Account';
import Box from '@/components/common/Box';
import fetchWrapper from '@/lib/fetchWrapper';
import Donation from '@/components/campaign/Donation';
import { getRegisteredAccount } from '@/api/account/getRegisteredAccount';
import Typography from '@/components/common/Typography';
import Flex from '@/components/common/Flex';
import getSessionMember from '@/api/member/getSessionMember';

export default async function DonationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const campaignId = (await params).id;
  const { role } = await getSessionMember();

  const [campaignData, accountResponse] = await Promise.all([
    fetchWrapper(`/campaigns/${campaignId}`, {
      method: 'GET',
    }).then((res) => res.json()),
    getRegisteredAccount(),
  ]);

  const registeredAccount =
    accountResponse.ok && accountResponse.data ? accountResponse.data : null;

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Donation
        name={campaignData.name}
        image={campaignData.titleImageUrl}
        id={campaignData.id}
        isAccount={registeredAccount}
        role={role}
      />

      <Box
        as="section"
        marginBottom="15px"
        backgroundColor="white"
        padding="1.5rem 1rem"
        paddingBottom="3.5rem"
      >
        <Typography as="h3" weight="medium" style={{ marginLeft: '0.5rem' }}>
          결제수단
        </Typography>
        <Flex justifyContent='center' style={{marginTop: '0.5rem'}}>
          <Account registeredAccount={registeredAccount} />
        </Flex>
      </Box>
    </div>
  );
}
