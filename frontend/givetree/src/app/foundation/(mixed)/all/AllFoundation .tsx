'use client';

import * as style from './all.css';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import TabItem from '@/components/foundation/main/TabItem';
import { useRouter } from 'next/navigation';
import { Foundation } from '@/api/foundation/getFoundation';
import FoundationItem from '@/components/foundation/main/FoundationItem';
import { useState } from 'react';

interface AllFoundationProps {
  initialFoundations: Foundation[];
}

export default function AllFoundation({
  initialFoundations,
}: AllFoundationProps) {
  const router = useRouter();
  const [foundations, setFoundations] = useState(initialFoundations);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);

    try {
      const params =
        category === '전체'
          ? { name: '', category: '' }
          : { name: '', category };

      const response = await fetch(
        `/api/foundations?${new URLSearchParams(params).toString()}`,
        { method: 'GET' }
      );

      if (!response.ok) throw new Error('Failed to fetch foundations');

      const data = await response.json();
      setFoundations(data.content);
    } catch (error) {
      console.error('Failed to fetch foundations:', error);
    }
  };

  return (
    <Box className={style.mainBg}>
      {/* 카테고리 탭 */}
      <Flex>
        <TabItem
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Flex>

      {/* 재단 리스트 */}
      <Box className={style.listBox}>
        <Flex flexDirection="column" gap="0.75rem">
          {foundations.map((foundation) => (
            <FoundationItem
              key={foundation.id}
              foundation={foundation}
              onClick={() => router.push(`/foundation/${foundation.id}/detail`)}
            />
          ))}
          {foundations.length === 0 && (
            <Box className={style.noResult}>
              <p>해당 카테고리의 재단이 없습니다.</p>
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
