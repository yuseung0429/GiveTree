import Box from '@/components/common/Box';
import * as style from './Account.css';
import Flex from '@/components/common/Flex';
import { BiPlus } from 'react-icons/bi';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Link from 'next/link';

export interface AccountInfo {
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
    <Box width="100vw" padding="0 1rem">
      <Flex
        className={style.accountBox}
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundColor: registeredAccount
            ? colorPalette.primary[50]
            : colorPalette.grey[200],
          border: registeredAccount
            ? 'none'
            : `1px solid ${colorPalette.grey[400]}`,
        }}
      >
        <Flex alignItems="center" flexDirection="column" gap={10}>
          {registeredAccount ? (
            <>
              <Typography weight="semiBold" color={colorPalette.grey[700]}>
                {registeredAccount.bankName}
              </Typography>
              <Typography weight="light" color={colorPalette.grey[700]}>
                {`${registeredAccount.accountNumber.slice(0, -6)}${'*'.repeat(
                  6
                )}`}
              </Typography>
            </>
          ) : (
            <>
              <Link href={'/account'}>
                <Flex
                  className={style.plus}
                  justifyContent="center"
                  alignItems="center"
                >
                  <BiPlus size={20} color={colorPalette.grey[700]} />
                </Flex>
              </Link>

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
