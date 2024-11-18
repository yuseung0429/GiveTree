import Link from 'next/link';

import { HiCloud } from 'react-icons/hi2';

import { getTransaction } from '@/api/ledger/getTransaction';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import ExpenseItem from '@/components/common/ExpenseItem';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

export default async function MyTransaction({ page }: { page: number }) {
  const data = await getTransaction(page);

  return (
    <Box height="100%" padding="1rem">
      {data.content.length === 0 ? (
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Flex flexDirection="column" alignItems="center" gap="1rem">
            <HiCloud size="3rem" />
            <Typography>입출금 내역이 없습니다.</Typography>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex flexDirection="column" gap="1rem">
            {data.content.map((item, index) => (
              <ExpenseItem
                key={index}
                amount={item.amount}
                date={item.processedAt}
                message={item.message}
                type={item.type}
              />
            ))}
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            style={{ marginTop: '1rem' }}
          >
            <Link href={`/mytransaction/${data.number - 1}`} replace={true}>
              <Button size="sm" disabled={!data.number}>
                이전
              </Button>
            </Link>
            <Typography>{data.number + 1}</Typography>
            <Link href={`/mytransaction/${data.number + 1}`} replace={true}>
              <Button size="sm" disabled={data.number >= data.totalPages - 1}>
                다음
              </Button>
            </Link>
          </Flex>
        </>
      )}
    </Box>
  );
}
