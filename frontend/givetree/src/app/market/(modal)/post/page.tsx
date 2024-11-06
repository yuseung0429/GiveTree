import React from 'react';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import DonationNotification from '@/components/common/DonationNotification';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import SalePostHeader from '@/components/market/SalePostHeader';
import SimpleProfile from '@/components/market/SimpleProfile';

const description = `갤럭시노트9 블루 512 대용량입니다.
외관 상태 사진 첨부한 상태 그대로입니다 매우 매우
깨끗합니다!
배터리 부분 광탈현상 불량증상없이 정상입니다
액정 잔상 기스없이 상태 매우 좋습니다!
최초 통신사는 SKT이지만 통신사 상관없이 SKT KT LGU+ 알뜰폰 모두 사용 가능합니다!
직거래 선호하며, 구미 진평동 인근에서 가능합니다!`;

const createdAt = '2024-11-06T05:22:26.977Z';

export default function PostPage() {
  return (
    <>
      <Box width="100%" height="12rem" backgroundColor="#ccc" />
      <Box padding="1rem">
        <SimpleProfile
          name="코딩하는 돌아이"
          size="md"
          profileImage="https://github.com/user-attachments/assets/14513e04-bf23-4d90-8f29-7f6295690ea5"
        />
        <Box padding="1rem 0">
          <SalePostHeader
            title="갤럭시노트9 블루색상 512"
            price={180000}
            tags={['판매중', '직거래', '거의 새 것']}
            createdAt={createdAt}
          />
        </Box>
        <DonationNotification profileImage="https://github.com/user-attachments/assets/14513e04-bf23-4d90-8f29-7f6295690ea5">
          결제 금액은 전액 사회복지법인 굿네이버스에 후원됩니다.
        </DonationNotification>
        <Box padding="1rem 0">
          <Typography style={{ lineHeight: '1.5' }}>
            {description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Flex justifyContent="space-between">
          <Typography color={colorPalette.text[700]} size={typography.size.sm}>
            조회수 21
          </Typography>
          <Typography color={colorPalette.text[700]} size={typography.size.sm}>
            {new Date(createdAt).toLocaleString()}
          </Typography>
        </Flex>
      </Box>
    </>
  );
}
