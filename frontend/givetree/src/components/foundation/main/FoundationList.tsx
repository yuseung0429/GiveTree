'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Flex from '@/components/common/Flex';
import FoundationItem from './FoundationItem';
import { Foundation } from '@/api/foundation/getFoundation';

interface FoundationListProps {
  foundations: Foundation[];
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
          }}
          onClick={() => handleItemClick(foundation.id)}
        />
      ))}
    </Flex>
  );
}
