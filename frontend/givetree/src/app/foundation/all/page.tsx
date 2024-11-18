export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { searchFoundations } from '@/api/foundation/getFoundation';
import { getFoundationCategories } from '@/api/foundation/getFoundationCategories';
import AllFoundation from '@/app/foundation/all/AllFoundation ';

export default async function Page() {
  // const foundationsData = await searchFoundations({ name: '', category: '' });
  const [foundationsData, categoriesData] = await Promise.all([
    searchFoundations({ name: '', category: '' }),
    getFoundationCategories(),
  ]);
  const foundations = foundationsData.ok ? foundationsData.data?.content : [];
  const categories = categoriesData.ok ? categoriesData.data : [];

  const allCategories = ['전체', ...(categories || [])];

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <AllFoundation
        initialFoundations={foundations || []}
        categories={allCategories}
      />
    </Suspense>
  );
}
