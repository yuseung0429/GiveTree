import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';
import * as s from '@/components/myPage/Usage/Usage.css';

export default function FoundationDonation({ month }: { month: number }) {
  return (
    <>
      <Box className={s.usageBox}>
        <Typography color={colorPalette.grey[800]}>2024-10-23</Typography>
        <Typography as="h3" weight="semiBold">
          {month}월 소연산타
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
