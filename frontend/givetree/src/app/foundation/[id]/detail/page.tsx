import { getFoundationById } from '@/api/foundation/getFoundationDetail';
import { getFoundationLedger } from '@/api/ledger/getLedger';
import FoundationDetail from './FoundationDetail';
import Typography from '@/components/common/Typography';
import Box from '@/components/common/Box';
import colorPalette from '@/styles/tokens/colorPalette';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [foundationResult, ledgerResult] = await Promise.all([
    getFoundationById(id),
    getFoundationLedger(id, 0, 5),
  ]);

  if (!foundationResult.ok || !foundationResult.data) {
    return (
      <Box>
        <Typography color={colorPalette.danger[500]}>
          {foundationResult.message || '재단 정보를 찾을 수 없습니다.'}
        </Typography>
      </Box>
    );
  }

  if (!ledgerResult.ok || !ledgerResult.data) {
    return (
      <Box>
        <Typography color={colorPalette.danger[500]}>
          {ledgerResult.message || '재단 정보를 찾을 수 없습니다.'}
        </Typography>
      </Box>
    );
  }

  return (
    <FoundationDetail
      foundationData={foundationResult.data}
      ledgerData={ledgerResult.data}
    />
  );
}
