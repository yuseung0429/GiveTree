import Link from 'next/link';

import { getTimeDifference } from '@/utils/time';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Flex from '@/components/common/Flex';
import ProfileImage from '@/components/common/ProfileImage';
import Typography from '@/components/common/Typography';

import * as s from './ChatListItem.css';

interface ChatListItemProps {
  saleId: number;
  title: string;
  profileImageUrl: string;
  nickname: string;
  lastContent: string;
  updatedAt: string;
  chatroomId: number;
}

const ChatListItem = ({
  saleId,
  title,
  profileImageUrl,
  nickname,
  lastContent,
  updatedAt,
  chatroomId,
}: ChatListItemProps) => {
  return (
    <div className={s.container}>
      <Link href={`/market/chat/${saleId}/${chatroomId}`}>
        <Flex alignItems="center" gap="0.5rem">
          <div style={{ flex: '0 0 auto' }}>
            <ProfileImage src={profileImageUrl} />
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <Flex justifyContent="space-between">
              <Typography size={typography.size.sm} weight="regular">
                {title}
              </Typography>
              <Typography
                size={typography.size.sm}
                color={colorPalette.grey[700]}
              >
                {getTimeDifference(updatedAt)}
              </Typography>
            </Flex>
            <Typography
              size={typography.size.lg}
              weight="semiBold"
              style={{ margin: '0.25rem 0 0.5rem' }}
            >
              {nickname}
            </Typography>
            <Typography>{lastContent}</Typography>
          </div>
        </Flex>
      </Link>
    </div>
  );
};

export default ChatListItem;
