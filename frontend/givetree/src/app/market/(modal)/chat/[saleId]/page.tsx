import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import Chat from './[chatroomId]/chat';
import Loading from '@/components/common/Loading';
import MarketError from '@/app/market/error';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ saleId: string; chatroomId: string }>;
}) {
  const saleId = parseInt((await params).saleId);
  const chatroomId = parseInt((await params).chatroomId);

  return (
    <ErrorBoundary errorComponent={MarketError}>
      <Suspense fallback={<Loading />}>
        <Chat saleId={saleId} chatroomId={chatroomId} />
      </Suspense>
    </ErrorBoundary>
  );
}
