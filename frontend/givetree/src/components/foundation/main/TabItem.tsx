'use client';

import React from 'react';
import Box from '@/components/common/Box';
import * as style from '@/app/foundation/all/all.css';
import Flex from '@/components/common/Flex';
import TabButton from '@/components/common/Tab';

interface TabItemProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function TabItem({
  categories,
  selectedCategory,
  onCategoryChange,
}: TabItemProps) {
  const width = `calc(100% / ${categories.length})`;

  return (
    <Box className={style.tabContainer}>
      <Flex>
        {categories.map((category) => (
          <TabButton
            key={category}
            label={category}
            isSelected={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
            width={width}
          />
        ))}
      </Flex>
    </Box>
  );
}
