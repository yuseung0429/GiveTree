export const dynamic = 'force-dynamic';

import AppBar from '@/components/common/AppBar';
import ExpenseItem from '@/components/common/ExpenseItem';
import Flex from '@/components/common/Flex';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import { getUserLedger } from '@/api/ledger/getLedger';
import colorPalette from '@/styles/tokens/colorPalette';
import Typography from '@/components/common/Typography';

export default async function Page() {
  const data = await getUserLedger(0, 50);

  return (
    <Layout>
      <header>
        <AppBar title="지갑 입출금내역" showBackButton />
      </header>
      <main style={{ backgroundColor: '#F5F5F5', padding: '20px' }}>
        <Flex flexDirection="column" gap="10px" style={{ padding: '15px 0' }}>
          {data.content.length === 0 ? (
            <Flex
              justifyContent="center"
              alignItems="center"
              style={{
                minHeight: '300px',
                backgroundColor: '#b2dfdb69',
                borderRadius: '10px',
              }}
            >
              <Typography color={colorPalette.grey[600]}>
                출금 내역이 없습니다.
              </Typography>
            </Flex>
          ) : (
            data.content.map((entry) => (
              <ExpenseItem
                key={entry.processedAt}
                date={entry.processedAt}
                message={entry.message}
                amount={entry.amount}
                type={entry.type}
                borderColor={colorPalette.grey[300]}
              />
            ))
          )}
        </Flex>
      </main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
