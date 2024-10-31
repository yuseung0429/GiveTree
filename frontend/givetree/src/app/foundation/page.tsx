"use client";

import Link from 'next/link';
import { Suspense } from "react";
import Searchbar from "@/app/foundation/components/searchbar";
import Typography from "@/components/common/Typography";
import RecomFoundation from './components/RecomFoundation'
import * as style from './foundation.css'
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import FoundationItem from '@/app/foundation/components/FoundationItem';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  
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
        {foundations.map((foundation) => (
            <FoundationItem 
              key={foundation.id} 
              foundation={foundation}
              onClick={() => router.push(`/foundation/${foundation.id}/detail`)} // 클릭 시 이동 설정
            />
          ))}
        </Flex>
      </Box>

    </Box>
  );
}