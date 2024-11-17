import { getTokenBalance } from '@/api/token/getTokenBalance';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Link from 'next/link';
import { FaTree } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import * as style from './wallet.css';
import getSessionFoundation from '@/api/member/getSessionFoundation';

export default async function Wallet() {
  const { balance } = await getTokenBalance();
  const { name } = await getSessionFoundation();

  return (
    <>
      {/* 월렛 계좌 */}
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        className={style.walletcontainer}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <FaTree size={16} color={colorPalette.primary[600]} />
            <Typography weight="semiBold" size={18}>
              {name} 월렛
            </Typography>
          </Flex>
          <Link href="/wallet">
            <IoMdRefresh size={22} color={colorPalette.grey[800]} />
          </Link>
        </Flex>

        <Typography
          size={22}
          weight="bold"
          color={colorPalette.primary[600]}
          style={{ textAlign: 'center' }}
        >
          {balance.toLocaleString()}원
        </Typography>

        {/* 출금버튼 */}
        <Flex gap={10} style={{ width: '100%' }}>
          <Link href="wallet/exchange/foundation" style={{ flex: 1 }}>
            {/* 재단 출금 */}
            <Button fullWidth>재단 출금하기</Button>
          </Link>

          <Link href="wallet/exchange/campaign" style={{ flex: 1 }}>
            {/* 캠페인 출금 */}
            <Button fullWidth>캠페인 출금하기</Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
