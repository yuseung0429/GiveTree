import Box from '@/components/common/Box';
import * as style from './Account.css';
import Flex from '@/components/common/Flex';
import { BiPlus } from 'react-icons/bi';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

export default function Account() {
  return (
    <Box>
      <Typography as="h3" weight="medium" style={{ marginLeft: '0.5rem' }}>
        결제수단
      </Typography>
      <Flex
        className={style.accountBox}
        justifyContent="center"
        alignItems="center"
      >
        <Flex alignItems="center" flexDirection="column" gap={10}>
          <Flex
            className={style.plus}
            justifyContent="center"
            alignItems="center"
          >
            <BiPlus size={20} color={colorPalette.grey[700]} />
          </Flex>
          <Typography size={12} weight="medium" color={colorPalette.grey[700]}>
            간편계좌 추가
          </Typography>
        </Flex>
      </Flex>
    </Box>
  );
}
