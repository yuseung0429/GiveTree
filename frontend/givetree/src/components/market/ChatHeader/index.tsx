import Link from 'next/link';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

interface ChatHeaderProps {
  id: number;
  title: string;
  price: number;
}

const ChatHeader = ({ id, title, price }: ChatHeaderProps) => {
  return (
    <Link href={`/market/post/${id}`}>
      <Box
        padding="0.75rem"
        style={{ borderBottom: `0.0625rem solid ${colorPalette.grey[300]}` }}
      >
        <Flex alignItems="center" gap="0.75rem">
          <Box
            width="2rem"
            height="2rem"
            borderRadius="0.5rem"
            backgroundColor="#eee"
            style={{ flex: '0 0 auto' }}
          />
          <Flex
            flexDirection="column"
            gap="0.25rem"
            style={{ overflow: 'hidden' }}
          >
            <Typography size={typography.size.sm} ellipsis>
              {title}
            </Typography>
            <Typography size={typography.size.sm} weight="semiBold">
              {price.toLocaleString()}원
            </Typography>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default ChatHeader;
