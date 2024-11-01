import Box from '@/components/common/Box';
import * as style from './Account.css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

export default function Account() {
  return (
    <Box>
      <Typography as="h4" weight="semiBold" color={colorPalette.grey[600]}>
        결제 수단
      </Typography>
      <Box className={style.accountBox}>임시</Box>
    </Box>
  );
}
