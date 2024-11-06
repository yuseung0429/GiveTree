'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import FoundationItem from '@/components/foundation/main/FoundationItem';
import * as style from './searchStyle.css';
import Searchbar from '@/components/foundation/search/searchbar';
import Flex from '@/components/common/Flex';
import colorPalette from '@/styles/tokens/colorPalette';

type Foundation = {
  id: number;
  name: string;
};

const foundations: Foundation[] = [
  { id: 1, name: '사회복지 법인 굿네이버스' },
  { id: 2, name: '기아대책' },
  { id: 3, name: '월드비전' },
  { id: 4, name: '초록우산 어린이재단' },
  { id: 5, name: '유니세프 한국위원회' },
  { id: 6, name: '유니세프 법인 굿네이버스' },
  { id: 7, name: '유니세프' },
];

export default function Page() {
  return (
    <Suspense fallback={<div>검색중...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredFoundations = foundations.filter((foundation) =>
    foundation.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (query: string) => {
    router.push(`/foundation/search?q=${query}`);
  };

  return (
    <Flex flexDirection="column" className={style.container}>
      <Box className={style.searchSection} marginBottom="20px">
        <Searchbar onSearch={handleSearch} initialValue={query} />
      </Box>

      <Box className={style.resultCount} marginBottom="20px" paddingLeft="5px">
        <Typography weight="medium" size={16} color={colorPalette.grey[700]}>
          {filteredFoundations.length}개의 검색결과가 있습니다
        </Typography>
      </Box>

      <Box className={style.searchbox}>
        <Flex flexDirection="column" gap="10px">
          {filteredFoundations.map((foundation) => (
            <FoundationItem
              key={foundation.id}
              foundation={foundation}
              onClick={() => router.push(`/foundation/${foundation.id}/detail`)}
            />
          ))}

          {filteredFoundations.length === 0 && (
            <Box className={style.noResult}>
              <Typography>검색 결과가 없습니다.</Typography>
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
