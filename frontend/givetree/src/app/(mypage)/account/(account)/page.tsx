export const dynamic = 'force-dynamic';

import { getRegisteredAccount } from '@/api/account/getRegisteredAccount';
import { getPasswordExists } from '@/api/account/getPasswordExists';
import AccountClient from './AccountClient';

export default async function Page() {
  const accountResponse = await getRegisteredAccount();
  const passwordResponse = await getPasswordExists();

  return (
    <AccountClient
      initialAccount={
        accountResponse.ok && accountResponse.data ? accountResponse.data : null
      }
      hasPassword={Boolean(
        passwordResponse.ok && passwordResponse.data?.exists
      )}
    />
  );
}
