import Link from 'next/link';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

export default function SignUp() {
  return (
    <Box padding="1rem">
      <Typography as="h2" weight="semiBold">
        재단 로그인
      </Typography>
      <Flex alignItems="center" justifyContent="space-between">
        <Typography size="sm">재단이 아니라 후원자이신가요?</Typography>
        <Link href="/signin">
          <Button variant="outlined" size="sm">
            후원자 로그인
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
