'use client';

import Link from 'next/link';

import useGetSalePost from '@/api/market/useGetSalePost';

import typography from '@/styles/tokens/typography';

import Flex from '@/components/common/Flex';
import ProfileImage from '@/components/common/ProfileImage';
import Typography from '@/components/common/Typography';
import PurchaseButton from '@/components/market/PurchaseButton';
import ReservationButton from '@/components/market/ReservationButton';

interface ChatHeaderProps {
  saleId: number;
  memberId: number;
  purchaserId: number;
}

const ChatHeader = ({ saleId, memberId, purchaserId }: ChatHeaderProps) => {
  const data = useGetSalePost(saleId);

  if (!data) {
    return <></>;
  }

  return (
    <Flex alignItems="center" gap="0.75rem" width="100%">
      <div style={{ flex: '1 1 auto' }}>
        <Link href={`/market/post/${saleId}`}>
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
      {data.saleStatus !== '판매완료' && (
        <div style={{ flex: '0 0 auto' }}>
          {data.sellerId === memberId ? (
            <ReservationButton saleId={saleId} purchaserId={purchaserId} />
          ) : (
            <PurchaseButton saleId={saleId} />
          )}
        </div>
      )}
    </Flex>
  );
};

export default ChatHeader;
