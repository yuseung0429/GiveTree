import { Suspense } from 'react';
import SearchContent from './SearchContent';
import { searchFoundations } from '@/api/foundation/getFoundation';

type SearchParams = { q: string | undefined };

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';

  const foundationsData = await searchFoundations({ name: query });
  const foundations = foundationsData.ok ? foundationsData.data?.content : [];

  return (
    <Suspense fallback={<div>검색중...</div>}>
      <SearchContent
        initialFoundations={foundations || []}
        initialQuery={query}
      />
    </Suspense>
  );
}
