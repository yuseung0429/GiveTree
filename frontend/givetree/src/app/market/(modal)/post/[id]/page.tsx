import React from 'react';

import { formatTime } from '@/utils/time';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import DonationNotification from '@/components/common/DonationNotification';
import Flex from '@/components/common/Flex';
import ImageCarousel from '@/components/common/ImageCarousel';
import Typography from '@/components/common/Typography';
import SimpleProfile from '@/components/common/SimpleProfile';
import SalePostHeader from '@/components/market/SalePostHeader';
import getSalePost from '@/api/market/getSalePost';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);
  const data = await getSalePost(id);

  return (
    <>
      <ImageCarousel height="12rem">
        {data.imageUrls.map((imageUrl, index) => (
          <ImageCarousel.Item
            key={index}
            src={imageUrl}
            alt={`${index + 1}번 상품 이미지`}
          />
        ))}
      </ImageCarousel>
      <Box padding="1rem">
        <SimpleProfile id={id} size="md" />
        <Box padding="1rem 0">
          <SalePostHeader
            id={id}
            title={data.title}
            price={data.price}
            tags={
              [
                data.saleStatus,
                data.productionCondition,
                data.isDirectSale && '직거래',
                data.isDeliverySale && '택배거래',
              ].filter(Boolean) as string[]
            }
            createdAt={data.createdDateTime}
          />
        </Box>
        <DonationNotification
          foundationId={data.foundationId}
          contribution={data.contribution}
          price={data.price}
        />
        <Box padding="1rem 0">
          <Typography style={{ lineHeight: '1.5' }}>
            {data.description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Flex justifyContent="space-between">
          <Typography color={colorPalette.text[700]} size={typography.size.sm}>
            조회수 {data.hits}
          </Typography>
          <Typography color={colorPalette.text[700]} size={typography.size.sm}>
            {formatTime(data.createdDateTime)}
          </Typography>
        </Flex>
      </Box>
    </>
  );
}
