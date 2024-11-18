'use client';

import { useRouter } from 'next/navigation';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import FoundationItem from '@/components/foundation/main/FoundationItem';
import * as style from './searchStyle.css';
import Searchbar from '@/components/foundation/search/searchbar';
import Flex from '@/components/common/Flex';
import colorPalette from '@/styles/tokens/colorPalette';
import { Foundation } from '@/api/foundation/getFoundation';

interface SearchContentProps {
  initialFoundations: Foundation[];
  initialQuery: string;
}

export default function SearchContent({
  initialFoundations,
  initialQuery,
}: SearchContentProps) {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/foundation/search?q=${query}`);
  };

  return (
    <Flex flexDirection="column" className={style.container}>
      <Box className={style.searchSection} marginBottom="1.5rem">
        <Searchbar onSearch={handleSearch} initialValue={initialQuery} />
      </Box>

      <Box
        className={style.resultCount}
        marginBottom="0.75rem"
        paddingLeft="5px"
      >
        <Typography weight="medium" size={16} color={colorPalette.grey[700]}>
          {initialFoundations.length}개의 검색결과가 있습니다
        </Typography>
      </Box>

      <Box className={style.searchbox}>
        <Flex flexDirection="column" gap="0.75rem">
          {initialFoundations.map((foundation) => (
            <FoundationItem
              key={foundation.id}
              foundation={foundation}
              onClick={() => router.push(`/foundation/${foundation.id}/detail`)}
            />
          ))}

          {initialFoundations.length === 0 && (
            <Box className={style.noResult}>
              <Typography>검색 결과가 없습니다.</Typography>
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
