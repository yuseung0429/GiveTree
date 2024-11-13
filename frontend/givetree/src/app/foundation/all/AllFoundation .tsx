'use client';

import * as style from './all.css';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import TabItem from '@/components/foundation/main/TabItem';
import { useRouter } from 'next/navigation';
import { Foundation } from '@/api/foundation/getFoundation';
import FoundationItem from '@/components/foundation/main/FoundationItem';
import { useMemo, useState } from 'react';

interface AllFoundationProps {
  initialFoundations: Foundation[];
  categories: string[];
}

export default function AllFoundation({
  initialFoundations,
  categories,
}: AllFoundationProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredFoundations = useMemo(() => {
    if (selectedCategory === '전체') {
      return initialFoundations;
    }
    return initialFoundations.filter((foundation) =>
      foundation.categories.includes(selectedCategory)
    );
  }, [initialFoundations, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box className={style.mainBg}>
      {/* 카테고리 탭 */}
      <Flex>
        <TabItem
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Flex>

      {/* 재단 리스트 */}
      <Box className={style.listBox}>
        <Flex flexDirection="column" gap="0.75rem">
          {filteredFoundations.length > 0 ? (
            filteredFoundations.map((foundation) => (
              <FoundationItem
                key={foundation.id}
                foundation={foundation}
                onClick={() =>
                  router.push(`/foundation/${foundation.id}/detail`)
                }
              />
            ))
          ) : (
            <Box className={style.noResult}>
              <p>해당 카테고리의 재단이 없습니다.</p>
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
