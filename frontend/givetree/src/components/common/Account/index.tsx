import Box from '@/components/common/Box';
import * as style from './Account.css';
import Flex from '@/components/common/Flex';
import { BiPlus } from 'react-icons/bi';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

interface AccountInfo {
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  createdAt: string;
  expiryAt: string;
}

interface AccountProps {
  registeredAccount: AccountInfo | null;
}

export default function Account({ registeredAccount }: AccountProps) {
  return (
    <Box>
      <Flex
        className={style.accountBox}
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundColor: registeredAccount
            ? colorPalette.primary[100]
            : colorPalette.grey[200],
          border: registeredAccount
            ? 'none'
            : `1px solid ${colorPalette.grey[400]}`,
        }}
      >
        <Flex alignItems="center" flexDirection="column" gap={10}>
          {registeredAccount ? (
            <Typography weight="medium" color={colorPalette.grey[700]}>
              {`${
                registeredAccount.bankName
              } ${registeredAccount.accountNumber.slice(-5)}`}
            </Typography>
          ) : (
            <>
              <Flex
                className={style.plus}
                justifyContent="center"
                alignItems="center"
              >
                <BiPlus size={20} color={colorPalette.grey[700]} />
              </Flex>
              <Typography
                size={12}
                weight="medium"
                color={colorPalette.grey[700]}
              >
                간편계좌 추가
              </Typography>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
