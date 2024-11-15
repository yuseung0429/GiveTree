export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import Wallet from './wallet';
import * as s from './wallet.css';
import Loading from '@/components/common/Loading';

import Ledger from '@/app/wallet/(main)/ledger';

export default async function Page() {
  return (
    <>
      <div className={s.background}>
        <Suspense fallback={<Loading />}>
          <Wallet />
        </Suspense>
      </div>
      <Ledger />
    </>
  );
}
