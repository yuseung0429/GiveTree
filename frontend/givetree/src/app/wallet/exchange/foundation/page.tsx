export const dynamic = 'force-dynamic';

import { getRegisteredAccount } from '@/api/account/getRegisteredAccount';
import ExchangeClient from './ExchangeClient';

export default async function Page() {
  const response = await getRegisteredAccount();
  const registeredAccount = response.ok && response.data ? response.data : null;

  return <ExchangeClient initialAccount={registeredAccount} />;
}
