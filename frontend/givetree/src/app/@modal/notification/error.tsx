'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

export default function NotificationError() {
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
        오류가 발생하였습니다.
      </Typography>
      <Button color="secondary" onClick={handleClick}>
        닫기
      </Button>
    </Flex>
  );
}
