import DonationCash from '@/app/foundation/components/DonationCash';
import Box from '@/components/common/Box';
import Layout from '@/components/common/Layout';

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Layout>
      <Box as='section'>
        <DonationCash />
      </Box>
      <Box as='section' >
        { children }
      </Box>
    </Layout>
  );
}
