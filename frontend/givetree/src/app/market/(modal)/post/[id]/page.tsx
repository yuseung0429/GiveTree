import { Suspense } from 'react';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import Post from './post';
import PostError from './error';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);
  return (
    <ErrorBoundary errorComponent={PostError}>
      <Suspense fallback={<>로딩 중</>}>
        <Post id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
