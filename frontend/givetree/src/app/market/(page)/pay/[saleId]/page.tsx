import { Suspense } from 'react';

import Loading from '@/components/common/Loading';
import Pay from './pay';

export default async function PayPage({
  params,
}: {
  params: Promise<{ saleId: number }>;
}) {
  const saleId = Number((await params).saleId);

  return (
    <Suspense fallback={<Loading />}>
      <Pay saleId={saleId} />
    </Suspense>
  );
}
