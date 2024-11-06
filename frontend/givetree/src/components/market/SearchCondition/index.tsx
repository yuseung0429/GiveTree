'use client';

import Chip from '@/components/common/Chip';
import Flex from '@/components/common/Flex';

import { HiMiniXMark } from 'react-icons/hi2';

const SearchCondition = () => {
  return (
    <Flex gap="0.5rem">
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
    </Flex>
  );
};

export default SearchCondition;
