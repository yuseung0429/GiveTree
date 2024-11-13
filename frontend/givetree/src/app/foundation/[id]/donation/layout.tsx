import DonationCash from '@/components/foundation/donation/DonationCash';
import Box from '@/components/common/Box';
import Layout from '@/components/common/Layout';
import Account from '@/components/common/Account';
import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import { getRegisteredAccount } from '@/api/account/getRegisteredAccount';

export default async function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 등록된 계좌 정보 조회
  const response = await getRegisteredAccount();
  const registeredAccount = response.ok && response.data ? response.data : null;

  return (
    <Layout>
      <header>
        <AppBar title="후원하기" />
      </header>

      <main style={{ backgroundColor: '#F5F5F5' }}>
        <Box
          as="section"
          marginBottom="15px"
          backgroundColor="white"
          padding="25px 15px"
        >
          <DonationCash name={'사회복지법인 굿네이버스'} />
        </Box>

        <Box
          as="section"
          marginBottom="15px"
          backgroundColor="white"
          padding="20px 15px"
        >
          <Account registeredAccount={registeredAccount} />
        </Box>

        <Box as="section">{children}</Box>
      </main>
      <footer style={{ padding: '10px', backgroundColor: '#fff' }}>
        <Button size="xl" fullWidth>
          후원하기
        </Button>
      </footer>
    </Layout>
  );
}
