export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { searchFoundations } from '@/api/foundation/getFoundation';
import AllFoundation from '@/app/foundation/(mixed)/all/AllFoundation ';

export default async function Page() {
  const foundationsData = await searchFoundations({ name: '', category: '' });
  const foundations = foundationsData.ok ? foundationsData.data?.content : [];

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <AllFoundation initialFoundations={foundations || []} />
    </Suspense>
  );
}
