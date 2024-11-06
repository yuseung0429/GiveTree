import * as style from './foundation.css';
import Link from 'next/link';
import Searchbar from '@/components/foundation/search/searchbar';
import Typography from '@/components/common/Typography';
import RecomFoundation from '../../../components/foundation/main/RecomFoundation';
import Box from '@/components/common/Box';
import { Suspense } from 'react';
import FoundationList from '@/components/foundation/main/FoundationList';

// 임시 데이터 타입
type Foundation = {
  id: number;
  name: string;
};

// 임시 데이터
const foundations: Foundation[] = [
  { id: 1, name: '사회복지 법인 굿네이버스' },
  { id: 2, name: '기아대책' },
  { id: 3, name: '월드비전' },
  { id: 4, name: '초록우산 어린이재단' },
  { id: 5, name: '유니세프 한국위원회' },
];

export default function Page() {
  return (
    <Box className={style.mainBg}>
      {/* 검색창 */}
      <Box as="section" className={style.section}>
        <Suspense fallback={<div>로딩중...</div>}>
          <Searchbar />
        </Suspense>
      </Box>

      {/* 이 달의 추천 재단 */}
      <Box as="section" className={style.section}>
        <Typography as="h3" weight="semiBold" className={style.title}>
          이 달의 추천재단
        </Typography>
        <RecomFoundation />
      </Box>

      {/* 재단 둘러보기 */}
      <Box as="section" className={style.section}>
        <Box className={style.flextitle}>
          <Typography as="h3" weight="semiBold" className={style.title}>
            재단 둘러보기
          </Typography>
          <Link href="/foundation/all" prefetch>
            <Typography className={style.link}>더보기</Typography>
          </Link>
        </Box>

        <FoundationList foundations={foundations} />
      </Box>
    </Box>
  );
}
