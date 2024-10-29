import Link from 'next/link';
import { Suspense } from "react";
import Searchbar from "@/app/foundation/components/searchbar";
import Typography from "@/components/common/Typography";
import RecomFoundation from './components/RecomFoundation'
import * as style from './foundation.css'
import Box from '@/components/common/Box';

export default function Page() {
  return (
    <Box className={style.mainBg}>
      {/* 검색창 */}
      <section className={style.section}>
        <Suspense fallback={<div>Loading...</div>}>
          <Searchbar />
        </Suspense>
      </section>

      {/* 이 달의 추천 재단 */}
      <section className={style.section}>
        <Typography as="h3" weight="semiBold" className={style.title}>
          이 달의 추천재단
        </Typography>
        <RecomFoundation />
      </section>

      {/* 재단 둘러보기 */}
      <section className={style.section}>
        <div className={style.flextitle}>
          <Typography as="h3" weight="semiBold" className={style.title}>
            재단 둘러보기
          </Typography>
          <Link href="/signin">
            <Typography color='#000'>더보기</Typography>
          </Link>
        </div>
        

      </section>
    </Box>
  );
}