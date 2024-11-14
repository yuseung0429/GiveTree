import { Suspense } from 'react';

import Chat from './chat';
import Loading from '@/components/common/Loading';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);

  return (
    <Suspense fallback={<Loading />}>
      <Chat id={id} />
    </Suspense>
  );
}
