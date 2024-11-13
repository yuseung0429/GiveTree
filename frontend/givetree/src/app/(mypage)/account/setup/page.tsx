export const dynamic = 'force-dynamic';

import { getAllAccounts } from '@/api/account/getAllAcounts';
import AccountList from '@/components/myPage/Myfoundation/Account/AccountList';

export default async function Page() {
  const result = await getAllAccounts();
  const accounts = result.ok && result.data ? result.data : [];

  return <AccountList accounts={accounts} />;
}
