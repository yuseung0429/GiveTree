import Link from 'next/link';
import { Suspense } from "react";
import Searchbar from "@/app/foundation/components/searchbar";
import Typography from "@/components/common/Typography";
import RecomFoundation from './components/RecomFoundation'
import * as style from './foundation.css'
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import FoundationItem from '@/app/foundation/components/FoundationItem';

export default function Page() {
  return (
    <Box className={style.mainBg}>

      {/* 검색창 */}
      <Box as="section" className={style.section}>
        <Suspense fallback={<div>Loading...</div>}>
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
          <Link href="/foundation/all">
            <Typography className={style.link}>더보기</Typography>
          </Link>
        </Box>

        <Flex  flexDirection='column' gap='10px'>
          <FoundationItem></FoundationItem>
          <FoundationItem></FoundationItem>
          <FoundationItem></FoundationItem>
          <FoundationItem></FoundationItem>
          <FoundationItem></FoundationItem>
        </Flex>
      </Box>

    </Box>
  );
}