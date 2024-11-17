import { Suspense } from 'react';

import Loading from '@/components/common/Loading';
import ChatList from './chatlist';

export default async function ChatListPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ChatList />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';
