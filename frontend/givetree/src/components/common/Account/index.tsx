import Box from '@/components/common/Box';
import * as style from './Account.css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

export default function Account() {
  return (
    <Box>
      <Typography
        as="h3"
        weight="medium"
        size={20}
        color={colorPalette.grey[600]}
      >
        결제 수단
      </Typography>
      <Box className={style.accountBox}></Box>
    </Box>
  );
}
