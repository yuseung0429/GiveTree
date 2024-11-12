import Flex from '@/components/common/Flex';
import { getAllAccounts } from '@/api/account/getAllAcounts';
import AccountList from '@/components/myPage/Myfoundation/Account/AccountList';

export default async function Page() {
  const result = await getAllAccounts();
  console.log('Server Component - API Result:', result); // 서버 사이드 로그
  const accounts = result.ok && result.data ? result.data : [];

  return (
    <Flex flexDirection="column" gap={16}>
      <AccountList accounts={accounts} />
    </Flex>
  );
}
