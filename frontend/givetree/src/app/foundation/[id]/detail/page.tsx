import { getFoundationById } from '@/api/foundation/getFoundationDetail';
import { getFoundationLedger } from '@/api/ledger/getLedger';
import FoundationDetail from './FoundationDetail';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import FoundationErrror from '@/app/foundation/[id]/detail/error';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const id = Number((await params).id);
  const [foundationResult, ledgerResult] = await Promise.all([
    getFoundationById(id),
    getFoundationLedger(id, 0, 5),
  ]);

  return (
    <ErrorBoundary errorComponent={FoundationErrror}>
      <FoundationDetail
        foundationData={foundationResult}
        ledgerData={ledgerResult}
      />
    </ErrorBoundary>
  );
}
