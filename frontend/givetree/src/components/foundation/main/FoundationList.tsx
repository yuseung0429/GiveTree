'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Flex from '@/components/common/Flex';
import FoundationItem from './FoundationItem';

interface FoundationListProps {
  foundations: Array<{ id: number; name: string }>;
}

export default function FoundationList({ foundations }: FoundationListProps) {
  const router = useRouter();

  const handleItemClick = useCallback(
    (id: number) => {
      router.push(`/foundation/${id}/detail`);
    },
    [router]
  );

  return (
    <Flex flexDirection="column" gap="10px">
      {foundations.map((foundation) => (
        <FoundationItem
          key={foundation.id}
          foundation={{
            ...foundation,
            introduction: '굿네이버스는 1991년 설립되어 국내, 북한',
            profileImageUrl:
              'https://givetree-bucket.s3.amazonaws.com/66a569685d20cf5a27c49f94e82fdb47.png',
          }}
          onClick={() => handleItemClick(foundation.id)}
        />
      ))}
    </Flex>
  );
}
