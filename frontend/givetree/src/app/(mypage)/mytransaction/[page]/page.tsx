import MyTransaction from '@/app/(mypage)/mytransaction/[page]/mytransaction';
import Loading from '@/components/common/Loading';

import { Suspense } from 'react';

export default async function MyTransactionPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const page = Math.max(0, Number((await params).page) || 0);

  return (
    <Suspense fallback={<Loading />}>
      <MyTransaction page={page} />
    </Suspense>
  );
}
