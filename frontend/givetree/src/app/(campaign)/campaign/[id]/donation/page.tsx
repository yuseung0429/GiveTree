import Account from '@/components/common/Account';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import * as styles from './donation.css';
import fetchWrapper from '@/lib/fetchWrapper';
import Donation from '@/components/campaign/Donation';

export default async function DonationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const campaignId = (await params).id;
  const response = await fetchWrapper(`/campaigns/${campaignId}`, {
    method: 'GET',
  });
  const campaignData = await response.json();

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
        <Account />
      </Box>

      <div className={styles.giveButton}>
        <Button fullWidth>후원하기</Button>
      </div>
    </div>
  );
}
