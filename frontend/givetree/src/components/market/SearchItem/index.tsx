import * as s from './SearchItem.css';

import Link from 'next/link';

import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Chip from '@/components/common/Chip';

const SearchItem = () => {
  return (
    <div className={s.wrapper}>
      <Link href="/market/post">
        <Flex gap="0.5rem" alignItems="center" className={s.container}>
          <Box
            padding="1rem"
            borderRadius="0.75rem"
            backgroundColor="#eee"
            width="96px"
            height="96px"
            style={{ flex: '0 0 auto' }}
          ></Box>
          <Box style={{ flex: '1 1 auto', overflow: 'hidden' }}>
            <Typography weight="medium" ellipsis>
              갤럭시s23울트라1tb 팬텀블랙 자급제
            </Typography>
            <Typography
              size={typography.size.sm}
              weight="regular"
              style={{ margin: '0.25rem 0' }}
            >
              3시간 전
            </Typography>
            <Typography
              size={typography.size.lg}
              weight="semiBold"
              style={{ margin: '0.5rem 0' }}
            >
              850,000원
            </Typography>
            <Flex gap="0.375rem">
              <Chip size="sm">판매중</Chip>
              <Chip size="sm">직거래</Chip>
            </Flex>
          </Box>
        </Flex>
      </Link>
    </div>
  );
};

export default SearchItem;
