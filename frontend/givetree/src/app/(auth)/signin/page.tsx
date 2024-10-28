import Link from 'next/link';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

export default function SignIn() {
  return (
    <Box padding="1rem">
      <Typography as="h2" weight="semiBold">
        후원자 로그인
      </Typography>
      <Flex alignItems="center" justifyContent="space-between">
        <Typography size="sm">후원자가 아니라 재단이신가요?</Typography>
        <Link href="/signup">
          <Button variant="outlined" size="sm">
            재단 로그인
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
