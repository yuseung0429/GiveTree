import DonationCash from '@/components/foundation/DonationCash';
import Box from '@/components/common/Box';
import Layout from '@/components/common/Layout';
import Account from '@/components/common/Account/indext';

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Layout>
      <Box as='section' padding='20px 10px'>
        <DonationCash />
        <Account />
      </Box>

      <Box as='section' padding='20px 10px'>
        { children }
      </Box>
    </Layout>
  );
}
