import Link from 'next/link';

import { getTransaction } from '@/api/ledger/getTransaction';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import ExpenseItem from '@/components/common/ExpenseItem';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

export default async function MyTransaction({ page }: { page: number }) {
  const data = await getTransaction(page);

  return (
    <Box padding="1rem">
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
        <Link href={`/mytransaction/${data.number - 1}`}>
          <Button size="sm" disabled={!data.number}>
            이전
          </Button>
        </Link>
        <Typography>{data.number + 1}</Typography>
        <Link href={`/mytransaction/${data.number + 1}`}>
          <Button size="sm" disabled={data.number >= data.totalPages - 1}>
            다음
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
