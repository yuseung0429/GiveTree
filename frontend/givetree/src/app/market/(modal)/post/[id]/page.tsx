import { Suspense } from 'react';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import Loading from '@/components/common/Loading';
import Post from './post';
import MarketError from '@/app/market/error';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);
  return (
    <ErrorBoundary errorComponent={MarketError}>
      <Suspense fallback={<Loading />}>
        <Post id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
