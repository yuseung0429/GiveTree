'use client';

import * as style from '@/app/foundation/(mixed)/all/all.css';
import FoundationItem from '@/components/foundation/main/FoundationItem';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import TabItem from '@/components/foundation/main/TabItem';
import { useRouter } from 'next/navigation';

type Foundation = {
  id: number;
  introduction: string;
  profileImageUrl: string;
  name: string;
};

// 임시 데이터
const foundations: Foundation[] = [
  {
    id: 1,
    name: '사회복지 법인 굿네이버스',
    introduction: '설명1',
    profileImageUrl: '',
  },
  { id: 2, name: '기아대책', introduction: '설명2', profileImageUrl: '' },
  { id: 3, name: '월드비전', introduction: '설명3', profileImageUrl: '' },
  {
    id: 4,
    name: '초록우산 어린이재단',
    introduction: '설명4',
    profileImageUrl: '',
  },
  {
    id: 5,
    name: '유니세프 한국위원회',
    introduction: '설명5',
    profileImageUrl: '',
  },
];

export default function AllFoundation() {
  const router = useRouter();

  return (
    <Box className={style.mainBg}>
      {/* 카테고리 탭 */}
      <Flex>
        <TabItem />
      </Flex>

      {/* 재단 리스트 */}
      <Box className={style.listBox}>
        <Flex flexDirection="column" gap="0.75rem">
          {foundations.map((foundation) => (
            <FoundationItem
              key={foundation.id}
              foundation={foundation}
              onClick={() => router.push(`/foundation/${foundation.id}/detail`)}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
