import Account from '@/components/common/Account';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import * as styles from './donation.css';
import fetchWrapper from '@/lib/fetchWrapper';
import Donation from '@/components/campaign/Donation';
import { getRegisteredAccount } from '@/api/account/getRegisteredAccount';

export default async function DonationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const campaignId = (await params).id;

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
      <Box
        as="section"
        marginBottom="15px"
        backgroundColor="white"
        padding="25px 15px"
      >
        <Donation name={campaignData.name} />
      </Box>

      <Box
        as="section"
        marginBottom="15px"
        backgroundColor="white"
        padding="20px 15px"
      >
        <Account registeredAccount={registeredAccount} />
      </Box>

      <div className={styles.giveButton}>
        <Button fullWidth>후원하기</Button>
      </div>
    </div>
  );
}
