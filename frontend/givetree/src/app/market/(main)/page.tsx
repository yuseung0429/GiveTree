'use client';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import SearchCondition from '@/components/market/SearchCondition';
import SearchItem from '@/components/market/SearchItem';

export default function MarketPage() {
  return (
    <>
      <Box
        padding="1rem"
        backgroundColor="#fff"
        style={{ position: 'sticky', top: 0 }}
      >
        <SearchCondition />
      </Box>
      <Box padding="0 1rem 1rem 1rem">
        <Flex flexDirection="column" gap="1.25rem">
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
        </Flex>
      </Box>
    </>
  );
}
