import Link from 'next/link';

import color from '@/styles/tokens/color';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import OAuthList from '@/components/auth/OAuthList';

export default function SignIn() {
  return (
    <Flex alignItems="center" height="100%">
      <Box width="100%" padding="1rem">
        <Typography as="h2" weight="semiBold">
          후원자 로그인
        </Typography>

        <Box padding="2rem 0">
          <OAuthList />
        </Box>

        <Box
          padding="0.75rem"
          borderRadius="0.25rem"
          backgroundColor={color.grey[200]}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Typography size="sm">후원자가 아니라 재단이신가요?</Typography>
            <Link href="/foundation-signin">
              <Button variant="outlined" size="sm">
                재단 로그인
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
