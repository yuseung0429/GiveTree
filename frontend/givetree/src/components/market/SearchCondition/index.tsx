'use client';

import { useSearchParams } from 'next/navigation';

import { highlightedTags } from '@/constatns/tag';

import Chip from '@/components/common/Chip';
import Flex from '@/components/common/Flex';

const SearchCondition = () => {
  const searchParams = useSearchParams();

  const items: { text: string; name: string; value: string }[] = [];

  const textMap: Record<string, string> = {
    isDirectSale: '직거래',
    isDeliverySale: '택배거래',
  };

  searchParams.forEach((value, key) => {
    if (!value) {
      return;
    }

    if (['statuses', 'productionConditions'].includes(key)) {
      value.split(',').forEach((value) => {
        items.push({ text: value, name: key, value });
      });
      return;
    }

    items.push({ text: textMap[key] || value, name: key, value });
  });

  return (
    <Flex gap="0.5rem" flexWrap="wrap">
      {items.length === 0 ? (
        <Chip color="grey">최근 게시글</Chip>
      ) : (
        items.map((item) => (
          <Chip
            key={`${item.name}:${item.value}`}
            color={
              (item.name === 'query' ? 'text' : highlightedTags[item.text]) ||
              'grey'
            }
            size="md"
          >
            {item.text}
          </Chip>
        ))
      )}
    </Flex>
  );
};

export default SearchCondition;
