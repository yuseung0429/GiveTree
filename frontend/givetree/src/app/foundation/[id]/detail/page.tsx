"use client";

import TabButton from '@/components/common/Tab';
import * as style from './detail.css'
import Box from "@/components/common/Box";
import Flex from '@/components/common/Flex';
import { useState } from 'react';
import IntroTab from '@/app/foundation/[id]/detail/IntroTab';
import DonationTab from '@/app/foundation/[id]/detail/DonationTab';
import CampaignTab from '@/app/foundation/[id]/detail/CampaignTab';
// import Button from "@/components/common/Button";
// import Link from 'next/link';

const categories = ['소개', '모금함', '캠페인'];

export default function Page() {

  const [selectedCategory, setSelectedCategory] = useState('소개');
  
  return (
    <Flex flexDirection="column">
      <Box as="section" className={style.fixBox}>
        {/* 상단 배너 */}
        <Box className={style.foundationBanner}>
          단체 대표사진
        </Box>

        {/* 탭 */}
        <Box>
          <Flex>
            {categories.map((category) => (
              <TabButton
                key={category}
                label={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                width="calc(100% / 3)"
              />
            ))}
          </Flex>
        </Box>
      </Box>

      {/* 탭 하위 컴포넌트 */}
      <Box as="section" className={style.tabContentContainer}>
        {selectedCategory === '소개' && <IntroTab />}
        {selectedCategory === '모금함' && <DonationTab />}
        {selectedCategory === '캠페인' && <CampaignTab />}
      </Box>

      {/* 후원하기 버튼 - 하단 고정 */}
      {/* 
      <Link href="/foundation/donation/">
        <Button fullWidth">
          후원자 로그인
        </Button>
      </Link>
      */}
      


    </Flex>
  );
} 