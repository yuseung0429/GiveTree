import { getFoundationById } from '@/api/foundation/getFoundationDetail';
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
  const result = await getFoundationById(id);

  if (!result.ok || !result.data) {
    return (
      <Box>
        <Typography color={colorPalette.danger[500]}>
          {result.message || '재단 정보를 찾을 수 없습니다.'}
        </Typography>
      </Box>
    );
  }

  return <FoundationDetail foundationData={result.data} />;
}
