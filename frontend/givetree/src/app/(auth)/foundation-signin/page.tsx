import Link from 'next/link';

import { HiChevronLeft } from 'react-icons/hi2';

import color from '@/styles/tokens/color';
import colorPalette from '@/styles/tokens/colorPalette';

import FoundationSigninForm from '@/components/auth/FoundationSigninForm';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

export default function FoundationSignIn() {
  return (
    <Flex alignItems="center" height="100%">
      <Box width="100%" padding="1rem">
        <Flex alignItems="center">
          <Link href="/signin">
            <HiChevronLeft size="2rem" color={colorPalette.text[900]} />
          </Link>

          <Typography as="h2" weight="semiBold">
            재단 로그인
          </Typography>
        </Flex>

        <Box padding="2rem 0.5rem">
          <FoundationSigninForm />
        </Box>

        <Box
          padding="0.75rem"
          borderRadius="0.25rem"
          backgroundColor={color.grey[200]}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Typography size="sm">아직 재단 계정이 없으신가요?</Typography>
            <Link href="/foundation-signup">
              <Button variant="outlined" size="sm">
                재단 회원가입
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
