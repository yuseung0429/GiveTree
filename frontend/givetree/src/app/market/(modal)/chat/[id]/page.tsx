import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import Chat from './chat';
import Loading from '@/components/common/Loading';
import MarketError from '@/app/market/error';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);

  return (
    <ErrorBoundary errorComponent={MarketError}>
      <Suspense fallback={<Loading />}>
        <Chat id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
