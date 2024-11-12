import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import MarketItem from '@/components/market/MarketItem';
import SearchCondition from '@/components/market/SearchCondition';
import WriteButon from '@/components/market/WriteButton';

export default function MarketPage() {
  return (
    <Flex flexDirection="column" style={{ height: '100%' }}>
      <Box
        padding="1rem"
        backgroundColor="#fff"
        style={{
          flex: '0 0 auto',
          borderBottom: `0.0625rem solid ${colorPalette.grey[200]}`,
        }}
      >
        <SearchCondition />
      </Box>
      <Box style={{ flex: '1 1 auto', overflow: 'auto' }}>
        {new Array(10).fill(0).map((_, index) => (
          <MarketItem key={index} id={index} />
        ))}
        <WriteButon href="/market/write" />
      </Box>
    </Flex>
  );
}
