import Link from 'next/link';

import { ChatroomItem } from '@/types/chat/chat';

import { getTimeDifference } from '@/utils/time';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Flex from '@/components/common/Flex';
import ProfileImage from '@/components/common/ProfileImage';
import Typography from '@/components/common/Typography';

import * as s from './ChatListItem.css';

const ChatListItem = ({
  id,
  saleId,
  saleTitle,
  counterpartName,
  counterpartProfileImageUrl,
  lastMessage,
  lastMessageCreatedAt,
}: ChatroomItem) => {
  return (
    <div className={s.container}>
      <Link href={`/market/chat/${saleId}/${id}`}>
        <Flex alignItems="center" gap="0.5rem">
          <div style={{ flex: '0 0 auto' }}>
            <ProfileImage src={counterpartProfileImageUrl || ''} />
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <Flex justifyContent="space-between">
              <Typography size={typography.size.sm} weight="regular">
                {saleTitle}
              </Typography>
              <Typography
                size={typography.size.sm}
                color={colorPalette.grey[700]}
              >
                {getTimeDifference(lastMessageCreatedAt)}
              </Typography>
            </Flex>
            <Typography
              size={typography.size.lg}
              weight="semiBold"
              style={{ margin: '0.25rem 0 0.5rem' }}
            >
              {counterpartName}
            </Typography>
            <Typography>{lastMessage}</Typography>
          </div>
        </Flex>
      </Link>
    </div>
  );
};

export default ChatListItem;
