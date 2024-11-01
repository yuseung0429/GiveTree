"use client";

import React, { useState } from 'react';
import Box from "@/components/common/Box";
import * as style from '@/app/foundation/all/all.css'
import Flex from '@/components/common/Flex';
import TabButton from '@/components/common/Tab';

const categories = ['전체', '카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5'];

export default function TabItem () {

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const width = `calc(100% / ${categories.length})`;

  return (
    <Box className={style.tabContainer}>
      <Flex>
        {categories.map((category) => (
          <TabButton 
            key={category}
            label={category}
            isSelected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            width={width}
          />
        ))}
      </Flex>
    </Box>
  );
}