'use client';

import { HiMiniXMark } from 'react-icons/hi2';

import Box from '@/components/common/Box';
import Chip from '@/components/common/Chip';

export default function MarketPage() {
  return (
    <Box>
      <Chip
        color="grey"
        size="md"
        icon={<HiMiniXMark size="1rem" />}
        onClick={() => alert(1)}
      >
        갤럭시
      </Chip>
      <Chip
        color="grey"
        size="md"
        icon={<HiMiniXMark size="1rem" />}
        onClick={() => alert(1)}
      >
        직거래
      </Chip>
      <Chip
        color="grey"
        size="md"
        icon={<HiMiniXMark size="1rem" />}
        onClick={() => alert(1)}
      >
        판매중
      </Chip>
    </Box>
  );
}
