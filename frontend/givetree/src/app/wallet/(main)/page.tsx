export const dynamic = 'force-dynamic';

import { getTokenBalance } from '@/api/token/getTokenBalance';
import { getUserLedger } from '@/api/ledger/getLedger';
import WalletContainer from './WalletContainer';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  const [balanceResult, ledgerResult] = await Promise.all([
    getTokenBalance(),
    getUserLedger(0, 5),
  ]);

  async function refresh() {
    'use server';
    revalidatePath('/wallet');
  }

  return (
    <WalletContainer
      initialBalance={balanceResult}
      ledgerData={ledgerResult}
      refreshAction={refresh}
    />
  );
}
