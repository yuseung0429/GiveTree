import AppBar from '@/components/common/AppBar';
// import ExpenseItem from '@/components/common/ExpenseItem';
import Flex from '@/components/common/Flex';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';

export default function Page() {
  return (
    <Layout>
      <header>
        <AppBar title="지갑 출금내역" />
      </header>
      <main style={{ backgroundColor: '#F5F5F5', padding: '20px' }}>
        <Flex flexDirection="column" gap="10px">ㅇ
          {/* <ExpenseItem />
          <ExpenseItem />
          <ExpenseItem />
          <ExpenseItem />
          <ExpenseItem />
          <ExpenseItem />
          <ExpenseItem />
          <ExpenseItem />
          <ExpenseItem /> */}
        </Flex>
      </main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
