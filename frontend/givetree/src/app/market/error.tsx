'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

export default function MarketError() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="0.75rem"
      height="100%"
    >
      <Typography style={{ textAlign: 'center' }}>
        거래글이 삭제되었습니다.
      </Typography>
      <Button color="secondary" onClick={handleClick}>
        뒤로가기
      </Button>
    </Flex>
  );
}
