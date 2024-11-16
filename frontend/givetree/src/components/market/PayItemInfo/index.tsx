import getSalePost from '@/api/market/getSalePost';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import DonationNotification from '@/components/common/DonationNotification';
import Flex from '@/components/common/Flex';
import ImageCarousel from '@/components/common/ImageCarousel';
import Typography from '@/components/common/Typography';

interface PayItemInfo {
  saleId: number;
}

const PayItemInfo = async ({ saleId }: PayItemInfo) => {
  const data = await getSalePost(saleId);

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
      <Box padding="0.75rem">
        <Typography size={typography.size.lg}>{data.title}</Typography>
      </Box>
      <Box height="0.75rem" backgroundColor={colorPalette.grey[300]} />
      <Box padding="1rem">
        <Flex flexDirection="column" gap="1rem">
          <DonationNotification
            foundationId={data.foundationId}
            contribution={data.contribution}
            price={data.price}
          />
          <Box
            padding="1rem"
            borderRadius="0.25rem"
            backgroundColor={colorPalette.primary[50]}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Typography size={typography.size.lg} weight="bold">
                최종결제금액
              </Typography>
              <Typography
                size={typography.size.lg}
                weight="semiBold"
                color={colorPalette.primary[900]}
              >
                {data.price.toLocaleString()}원
              </Typography>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default PayItemInfo;
