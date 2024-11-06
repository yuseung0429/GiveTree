import Link from 'next/link';

import typography from '@/styles/tokens/typography';

import { HiChatBubbleOvalLeft } from 'react-icons/hi2';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Chip from '@/components/common/Chip';
import Button from '@/components/common/Button';

interface SalePostHeaderProps {
  id: number;
  title: string;
  price: number;
  tags: string[];
  createdAt: string;
}

const SalePostHeader = ({
  id,
  title,
  price,
  tags,
  createdAt,
}: SalePostHeaderProps) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex flexDirection="column" gap="1rem">
        <Flex flexDirection="column" gap="0.25rem">
          <Typography size={typography.size.lg} weight="semiBold">
            {title}
          </Typography>
          <Typography size={typography.size.sm}>
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </Flex>

        <Flex gap="0.5rem" style={{ flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Chip key={tag} size="sm">
              {tag}
            </Chip>
          ))}
        </Flex>
      </Flex>

      <Flex flexDirection="column" alignItems="flex-end" gap="0.5rem">
        <Typography size={typography.size.xl} weight="bold">
          {price.toLocaleString()}원
        </Typography>
        <div>
          <Link href={`/market/chat/${id}`}>
            <Button size="sm" icon={<HiChatBubbleOvalLeft size={'1.25rem'} />}>
              채팅하기
            </Button>
          </Link>
        </div>
      </Flex>
    </Flex>
  );
};

export default SalePostHeader;
