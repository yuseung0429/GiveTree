import Account from '@/components/common/Account';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { getRegisteredAccount } from '@/api/account/getRegisteredAccount';
import FoundationDonation from '@/components/foundation/donation/FoundationDonation';
import getSessionMember from '@/api/member/getSessionMember';
import getFoundation from '@/api/member/getFoundation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const foundationId = (await params).id;
  const { role } = await getSessionMember();
  const response = await getRegisteredAccount();
  const registeredAccount = response.ok && response.data ? response.data : null;
  const { name, profileImageUrl } = await getFoundation(foundationId);

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <FoundationDonation
        name={name}
        image={profileImageUrl}
        id={foundationId}
        isAccount={registeredAccount}
        role={role}
      />

      <Box
        as="section"
        marginBottom="15px"
        backgroundColor="white"
        padding="1.5rem 1rem"
      >
        <Typography as="h3" weight="medium" style={{ marginLeft: '0.5rem' }}>
          결제수단
        </Typography>
        <Flex justifyContent="center">
          <Account registeredAccount={registeredAccount} />
        </Flex>
      </Box>
    </div>
  );
}
