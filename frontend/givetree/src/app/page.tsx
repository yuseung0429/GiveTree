import Link from 'next/link';

import Button from '@/components/common/Button';
import Box from '@/components/common/Box';
import color from '@/styles/tokens/color';

export default function Home() {
  return (
    <Box as="main" >
      <Box
        padding="1rem"
        borderRadius="0.5rem"
        backgroundColor={color.grey[300]}
      >
        <Link href="/signin">
          <Button>회원가입</Button>
        </Link>
      </Box>
    </Box>
  );
}
