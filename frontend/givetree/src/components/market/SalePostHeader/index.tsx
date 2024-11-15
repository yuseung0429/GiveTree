'use client';

import { useRouter } from 'next/navigation';

import { HiChatBubbleOvalLeft, HiTrash } from 'react-icons/hi2';

import getChatroomId from '@/api/market/getChatroomId';

import { highlightedTags } from '@/constatns/tag';

import { getTimeDifference } from '@/utils/time';

import useDialog from '@/hooks/useDialog';

import typography from '@/styles/tokens/typography';

import deleteMarketPost from '@/actions/market/deleteMarketPost';

import Button from '@/components/common/Button';
import Chip from '@/components/common/Chip';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

interface SalePostHeaderProps {
  id: number;
  title: string;
  price: number;
  tags: string[];
  isAuthor: boolean;
  createdAt: string;
}

const SalePostHeader = ({
  id,
  title,
  price,
  tags,
  isAuthor,
  createdAt,
}: SalePostHeaderProps) => {
  const router = useRouter();
  const { alert, confirm } = useDialog();

  const handleDeleteClick = async () => {
    if (!(await confirm('게시글을 삭제하시겠습니까?'))) {
      return;
    }

    if (!(await deleteMarketPost(id))) {
      alert('삭제를 실패하였습니다.');
      return;
    }

    router.back();
  };

  const handleChatClick = async () => {
    try {
      const chatroomId = await getChatroomId(id);
      router.push(`/market/chat/${id}/${chatroomId}`);
    } catch {
      alert('채팅방 생성을 실패했습니다.');
    }
  };

  return (
    <Flex alignItems="flex-start" justifyContent="space-between">
      <Flex flexDirection="column" gap="1rem">
        <Flex flexDirection="column" gap="0.25rem">
          <Typography size={typography.size.lg} weight="semiBold">
            {title}
          </Typography>
          <Typography size={typography.size.sm}>
            {getTimeDifference(createdAt)}
          </Typography>
        </Flex>

        <Flex gap="0.5rem" style={{ flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Chip key={tag} size="sm" color={highlightedTags[tag] || 'grey'}>
              {tag}
            </Chip>
          ))}
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="flex-end"
        gap="0.5rem"
        style={{ flexShrink: '0' }}
      >
        <Typography size={typography.size.xl} weight="bold">
          {price.toLocaleString()}원
        </Typography>
        <div>
          {isAuthor ? (
            <Button
              color="danger"
              size="sm"
              icon={<HiTrash size={'1.25rem'} />}
              onClick={handleDeleteClick}
            >
              삭제하기
            </Button>
          ) : (
            <Button
              size="sm"
              icon={<HiChatBubbleOvalLeft size={'1.25rem'} />}
              onClick={handleChatClick}
            >
              채팅하기
            </Button>
          )}
        </div>
      </Flex>
    </Flex>
  );
};

export default SalePostHeader;
