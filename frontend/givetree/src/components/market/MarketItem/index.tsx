import Link from 'next/link';
import Image from 'next/image';

import { highlightedTags } from '@/constatns/tag';

import type { SalePost } from '@/types/market/market';

import { getTimeDifference } from '@/utils/time';

import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Chip from '@/components/common/Chip';

import * as s from './MarketItem.css';

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
  createdDateTime,
}: MarketItemProps) => {
  return (
    <div className={s.wrapper}>
      <Link href={`/market/post/${id}`}>
        <Flex gap="0.5rem" alignItems="flex-start" className={s.container}>
          <div className={s.imageWrapper}>
            <Image src={imageUrl} alt="상품 이미지" width={96} height={96} />
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
              {getTimeDifference(createdDateTime)}
            </Typography>
            <Typography
              size={typography.size.lg}
              weight="semiBold"
              style={{ margin: '0.5rem 0' }}
            >
              {price.toLocaleString()}원
            </Typography>
            <Flex gap="0.375rem" style={{ flexWrap: 'wrap' }}>
              <Chip size="sm" color={highlightedTags[status] || 'grey'}>
                {status}
              </Chip>

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
