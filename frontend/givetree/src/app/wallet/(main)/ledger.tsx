import Box from '@/components/common/Box';
import * as style from './ledger.css';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { MdNavigateNext } from 'react-icons/md';
import Link from 'next/link';
import ExpenseItem from '@/components/common/ExpenseItem';
import { getUserLedger } from '@/api/ledger/getLedger';

export default async function Ledger() {
  const ledger = await getUserLedger(0, 5);

  return (
    <Box className={style.listcontainer}>
      <Flex justifyContent="space-between" alignItems="center">
        <Typography
          weight="semiBold"
          size={20}
          color={colorPalette.primary[500]}
        >
          지갑 입출금내역
        </Typography>
        <Link href="/wallet/all" className={style.allbtn}>
          <Typography>전체보기</Typography>
          <MdNavigateNext size={18} />
        </Link>
      </Flex>
      {/* 리스트 */}
      <Flex flexDirection="column" gap="10px" style={{ padding: '15px 0' }}>
        {ledger.content.length === 0 ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            style={{
              minHeight: '300px',
              backgroundColor: '#b2dfdb69',
              borderRadius: '10px',
            }}
          >
            <Typography color={colorPalette.grey[600]}>
              출금 내역이 없습니다.
            </Typography>
          </Flex>
        ) : (
          ledger.content.map((entry) => (
            <ExpenseItem
              key={entry.processedAt}
              date={entry.processedAt}
              message={entry.message}
              amount={entry.amount}
              type={entry.type}
              borderColor={colorPalette.grey[300]}
            />
          ))
        )}
      </Flex>
    </Box>
  );
}
