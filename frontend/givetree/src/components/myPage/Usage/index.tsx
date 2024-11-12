import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as s from './Usage.css';
import typography from '@/styles/tokens/typography';

export default function Usage() {
  return (
    <>
      <Box className={s.usageBox}>
        <Typography color={colorPalette.grey[800]}>2024-10-23</Typography>
        <Typography as="h3" weight="semiBold">
          이불구입
        </Typography>
        <Typography
          as="h3"
          weight="semiBold"
          size={typography.size.lg}
          color={colorPalette.secondary[600]}
          style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
        >
          20,000원
        </Typography>
      </Box>
    </>
  );
}
