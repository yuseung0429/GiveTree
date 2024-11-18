import Link from 'next/link';

import getSalePost from '@/api/market/getSalePost';
import getSessionMember from '@/api/member/getSessionMember';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import ProfileImage from '@/components/common/ProfileImage';
import Typography from '@/components/common/Typography';
import PurchaseButton from '@/components/market/PurchaseButton';
import ReservationButton from '@/components/market/ReservationButton';

interface ChatHeaderProps {
  id: number;
}

const ChatHeader = async ({ id }: ChatHeaderProps) => {
  const data = await getSalePost(id);
  const member = await getSessionMember();

  return (
    <Box
      padding="0.75rem"
      style={{ borderBottom: `0.0625rem solid ${colorPalette.grey[300]}` }}
    >
      <Flex alignItems="center" gap="0.75rem">
        <div style={{ flex: '1 1 auto' }}>
          <Link href={`/market/post/${id}`}>
            <Flex alignItems="center" gap="0.75rem">
              <div style={{ flex: '0 0 auto' }}>
                <ProfileImage
                  src={data.imageUrls[0]}
                  size="sm"
                  style={{ borderRadius: '0.5rem' }}
                />
              </div>
              <Flex
                flexDirection="column"
                gap="0.25rem"
                style={{ flex: '1 1 auto', overflow: 'hidden' }}
              >
                <Typography size={typography.size.sm} ellipsis>
                  {data.title}
                </Typography>
                <Typography size={typography.size.sm} weight="semiBold">
                  {data.price.toLocaleString()}원
                </Typography>
              </Flex>
            </Flex>
          </Link>
        </div>
        <div style={{ flex: '0 0 auto' }}>
          {data.sellerId === member.id ? (
            <ReservationButton saleId={id} purchaserId={member.id} />
          ) : (
            <PurchaseButton saleId={id} />
          )}
        </div>
      </Flex>
    </Box>
  );
};

export default ChatHeader;
