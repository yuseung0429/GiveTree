import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Wallet from './wallet';
import * as s from './wallet.css';
import Loading from '@/components/common/Loading';
import Ledger from '@/app/wallet/(main)/ledger';
import WalletErrror from '@/app/wallet/(main)/error';

export default async function Page() {
  return (
    <>
      <div className={s.background}>
        <ErrorBoundary errorComponent={WalletErrror}>
          <Suspense fallback={<Loading />}>
            <Wallet />
          </Suspense>
        </ErrorBoundary>
      </div>
      <Ledger />
    </>
  );
}
