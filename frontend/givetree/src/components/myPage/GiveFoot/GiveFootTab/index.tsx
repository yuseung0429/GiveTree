'use client';

import Box from '@/components/common/Box';
import TabButton from '@/components/common/Tab';
import Typography from '@/components/common/Typography';
import OneTimeGive from '@/components/myPage/Donation/Foundation/OneTime';
import RegularGive from '@/components/myPage/Donation/Foundation/Regular';
import colorPalette from '@/styles/tokens/colorPalette';
import { useState } from 'react';
import GiveCampaign from '@/components/myPage/Donation/Campaign';
import { CampaignDonation } from '@/types/donation/campaign/types';
import {
  FoundationOneTimeDonation,
  FoundationRegularDonation,
} from '@/types/donation/foundation/types';

export default function GiveFootTab({
  CampaignDonation,
  FoundationRegularDonation,
  FoundationOneTimeDonation,
}: {
  CampaignDonation: CampaignDonation[];
  FoundationRegularDonation: FoundationRegularDonation[];
  FoundationOneTimeDonation: FoundationOneTimeDonation[];
}) {
  const categories = ['재단 후원', '캠페인 후원'];
  const [selectedCategory, setSelectedCategory] = useState('재단 후원');
  const width = `calc(100% / ${categories.length})`;

  return (
    <>
      {categories.map((category) => (
        <TabButton
          key={category}
          label={category}
          isSelected={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
          width={width}
        />
      ))}
      {selectedCategory === '재단 후원' && (
        <Box padding="1.25rem 0.25rem">
          <Typography as="h3" weight="medium" style={{ margin: '0 0.25rem' }}>
            <Typography
              weight="semiBold"
              color={colorPalette.primary[700]}
              style={{ display: 'inline-block' }}
            >
              {FoundationRegularDonation.length}개
            </Typography>
            의 재단에 정기 후원하고 있습니다.
          </Typography>
          {FoundationRegularDonation.map((donation, index) => (
            <RegularGive key={index} donation={donation} />
          ))}

          <div style={{ margin: '1.5rem 0rem 0.5rem' }}>
            <hr style={{ border: '1px dashed lightgrey' }} />
            <Typography
              as="h3"
              weight="medium"
              style={{ marginLeft: '0.25rem', marginTop: '0.5rem' }}
            >
              재단 일시 후원을{' '}
              <Typography
                weight="semiBold"
                color={colorPalette.primary[700]}
                style={{ display: 'inline-block', marginTop: '0.5rem' }}
              >
                {FoundationOneTimeDonation.length}회
              </Typography>{' '}
              했습니다.
            </Typography>
            {FoundationOneTimeDonation.map((donation, index) => (
              <OneTimeGive key={index} donation={donation} />
            ))}
          </div>
        </Box>
      )}
      {selectedCategory === '캠페인 후원' && (
        <Box padding="1.25rem 0.25rem">
          <Typography as="h3" weight="medium" style={{ marginLeft: '0.5rem' }}>
            캠페인 후원을{' '}
            <Typography
              weight="semiBold"
              color={colorPalette.primary[700]}
              style={{ display: 'inline-block' }}
            >
              {CampaignDonation.length}회
            </Typography>{' '}
            했습니다.
          </Typography>
          {CampaignDonation.map((donation, index) => (
            <GiveCampaign key={index} donation={donation} />
          ))}
        </Box>
      )}
    </>
  );
}
