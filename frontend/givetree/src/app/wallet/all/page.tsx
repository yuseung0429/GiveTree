export const dynamic = 'force-dynamic';

import AppBar from '@/components/common/AppBar';
import ExpenseItem from '@/components/common/ExpenseItem';
import Flex from '@/components/common/Flex';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import { getUserLedger, PaginatedResponse } from '@/api/ledger/getLedger';
import colorPalette from '@/styles/tokens/colorPalette';
import Typography from '@/components/common/Typography';

export default async function Page() {
  const result = await getUserLedger(0, 20);

  //  컨텐츠
  const renderContent = (data: PaginatedResponse) => {
    if (data.content.length === 0) {
      return (
        <Typography
          color={colorPalette.grey[600]}
          style={{ textAlign: 'center', padding: '100px 0' }}
        >
          출금 내역이 없습니다.
        </Typography>
      );
    }

    return data.content.map((entry) => (
      <ExpenseItem
        key={entry.processedAt}
        date={entry.processedAt}
        message={entry.message}
        amount={entry.amount}
        type={entry.type}
        borderColor={colorPalette.grey[300]}
        amountColor={
          entry.type === 'EXCHANGE'
            ? colorPalette.secondary[300]
            : colorPalette.primary[600]
        }
      />
    ));
  };

  return (
    <Layout>
      <header>
        <AppBar title="지갑 출금내역" />
      </header>
      <main style={{ backgroundColor: '#F5F5F5', padding: '20px' }}>
        <Flex flexDirection="column" gap="10px">
          {result.ok && result.data ? (
            renderContent(result.data)
          ) : (
            <Typography
              color={colorPalette.danger[500]}
              style={{ textAlign: 'center', padding: '20px 0' }}
            >
              {result.message || '입출금 내역을 불러올 수 없습니다.'}
            </Typography>
          )}
        </Flex>
      </main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
