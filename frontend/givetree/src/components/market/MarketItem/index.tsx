import Image from 'next/image';

import type { SalePost } from '@/types/market/market';

import * as s from './MarketItem.css';

import Link from 'next/link';

import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Chip from '@/components/common/Chip';

type MarketItemProps = SalePost;

const MarketItem = ({
  id,
  title,
  imageUrl,
  isDeliverySale,
  isDirectSale,
  price,
  productionsCondition,
  status,
}: MarketItemProps) => {
  return (
    <div className={s.wrapper}>
      <Link href={`/market/post/${id}`}>
        <Flex gap="0.5rem" alignItems="center" className={s.container}>
          <div className={s.imageWrapper}>
            <Image src={imageUrl} alt="상품 이미지" fill={true} />
          </div>
          <Box style={{ flex: '1 1 auto', overflow: 'hidden' }}>
            <Typography weight="medium" ellipsis>
              {title}
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
              {price.toLocaleString()}원
            </Typography>
            <Flex gap="0.375rem" style={{ flexWrap: 'wrap' }}>
              <Chip size="sm">{status}</Chip>

              {isDirectSale && <Chip size="sm">직거래</Chip>}
              {isDeliverySale && <Chip size="sm">택배거래</Chip>}
              <Chip size="sm">{productionsCondition}</Chip>
            </Flex>
          </Box>
        </Flex>
      </Link>
    </div>
  );
};

export default MarketItem;
