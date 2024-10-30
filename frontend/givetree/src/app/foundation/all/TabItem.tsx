"use client";
import React, { useState } from 'react';
import Box from "@/components/common/Box";
import * as style from '@/app/foundation/all/all.css'
import colorPalette from '@/styles/tokens/colorPalette';
import Flex from '@/components/common/Flex';

const categories = ['전체', '카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5'];

export default function TabItem () {

  const [selectedCategory, setSelectedCategory] = useState('전체');

  return (
    <Box className={style.tabContainer}>
      <Flex>
        {categories.map((category) => (
          <button
            key={category}
            className={style.tabButton}
            onClick={() => setSelectedCategory(category)}
            style={{
              color: selectedCategory === category ? colorPalette.primary[600] : colorPalette.grey[800],
              borderBottom: `2px solid ${
                selectedCategory === category ? colorPalette.primary[600] : colorPalette.grey[400]
              }`,
            }}
          >
            {category}
          </button>
        ))}
      </Flex>
    </Box>
  );
}