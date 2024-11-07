import Box from '@/components/common/Box';
import * as style from './Account.css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

export default function Account() {
  return (
    <Box>
      <Typography
        as="h4"
        size={18}
        weight="medium"
        color={colorPalette.grey[900]}
      >
        출금계좌
      </Typography>
      <Box className={style.accountBox}></Box>
    </Box>
  );
}
