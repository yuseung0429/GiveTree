import Box from '@/components/common/Box';
import * as style from './wallet.css';

import Layout from '@/components/common/Layout';
import MainAppBar from '@/components/common/MainAppBar';
import NavigationBar from '@/components/common/NavigationBar';
import Typography from '@/components/common/Typography';
import Flex from '@/components/common/Flex';
import Link from 'next/link';
import colorPalette from '@/styles/tokens/colorPalette';
import ExpenseItem from '@/components/common/ExpenseItem';
import { IoMdRefresh } from 'react-icons/io';
import { FaTree } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';

import Button from '@/components/common/Button';

export default function Page() {
  return (
    <Layout>
      <header>
        <MainAppBar>GIVE 월렛</MainAppBar>
      </header>
      <main style={{ backgroundColor: '#F5F5F5' }}>
        {/* 월렛 계좌 */}
        <Box className={style.grabox}>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            className={style.walletcontainer}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" gap="4px">
                <FaTree size={16} color={colorPalette.primary[600]} />
                <Typography weight="semiBold" size={18}>
                  굿네이버스 월렛
                </Typography>
              </Flex>
              <IoMdRefresh size={22} color={colorPalette.grey[800]} />
            </Flex>
            <Typography
              size={20}
              weight="bold"
              color={colorPalette.primary[600]}
              style={{ textAlign: 'center' }}
            >
              1,000,000원
            </Typography>
            <Link href="wallet/exchange">
              <Button fullWidth>출금하기</Button>
            </Link>
          </Flex>
        </Box>

        {/* 지갑 출금내역 보기 */}
        <Box className={style.listcontainer}>
          <Flex justifyContent="space-between" alignItems="center">
            <Typography
              weight="semiBold"
              size={20}
              color={colorPalette.primary[500]}
            >
              지갑 출금내역
            </Typography>
            <Link href="/wallet/all" className={style.allbtn}>
              <Typography>전체보기</Typography>
              <MdNavigateNext size={18} />
            </Link>
          </Flex>
          {/* 리스트 */}
          <Flex flexDirection="column" gap="10px" style={{ padding: '15px 0' }}>
            <ExpenseItem />
            <ExpenseItem />
            <ExpenseItem />
            <ExpenseItem />
          </Flex>
        </Box>
      </main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
