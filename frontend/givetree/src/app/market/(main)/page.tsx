'use client';

import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import SearchCondition from '@/components/market/SearchCondition';
import SearchItem from '@/components/market/SearchItem';

export default function MarketPage() {
  return (
    <>
      <Box
        padding="1rem"
        backgroundColor="#fff"
        style={{
          position: 'sticky',
          top: 0,
          borderBottom: `0.0625rem solid ${colorPalette.grey[200]}`,
        }}
      >
        <SearchCondition />
      </Box>
      <Box>
        {new Array(10).fill(0).map((_, index) => (
          <SearchItem key={index} />
        ))}
      </Box>
    </>
  );
}
