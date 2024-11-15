export const dynamic = 'force-dynamic';

import * as style from './foundation.css';
import Link from 'next/link';
import Searchbar from '@/components/foundation/search/searchbar';
import Typography from '@/components/common/Typography';
import RecomFoundation from '../../../components/foundation/main/RecomFoundation';
import Box from '@/components/common/Box';
import { Suspense } from 'react';
import FoundationList from '@/components/foundation/main/FoundationList';
import { searchFoundations } from '@/api/foundation/getFoundation';

export default async function Page() {
  const foundationsData = await searchFoundations({ name: '', category: '' });

  const firstFoundation = foundationsData.ok
    ? foundationsData.data?.content[0]
    : undefined;

  const topFoundations = foundationsData.ok
    ? foundationsData.data?.content.slice(0, 5)
    : [];

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
        {firstFoundation && (
          <Link href={`/foundation/${firstFoundation.id}/detail`}>
            <RecomFoundation foundation={firstFoundation} />
          </Link>
        )}
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

        <FoundationList foundations={topFoundations || []} />
      </Box>
    </Box>
  );
}
