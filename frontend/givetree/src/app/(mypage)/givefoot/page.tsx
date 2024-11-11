'use client';

import { useState } from 'react';
import GiveFoot from '@/components/myPage/GiveFoot';
import TabButton from '@/components/common/Tab';
import GiveCampaign from '@/components/myPage/Donation/Campaign';
import CampaignDonation from '@/mock/CampaignDonation.json';
import FoundationDonation from '@/mock/FoundationDonation.json';
import Typography from '@/components/common/Typography';
import Box from '@/components/common/Box';
import RegularGive from '@/components/myPage/Donation/Foundation/Regular';
import OneTimeGive from '@/components/myPage/Donation/Foundation/OneTime';
import colorPalette from '@/styles/tokens/colorPalette';

export default function GiveFootPage() {
  const name = '눈사람';
  const categories = ['재단 후원', '캠페인 후원'];
  const [selectedCategory, setSelectedCategory] = useState('재단 후원');
  const width = `calc(100% / ${categories.length})`;

  return (
    <Box padding="1rem">
      <GiveFoot name={name} />

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
        <Box padding="1.25rem 0.75rem">
          <Typography as="h3" weight="medium" style={{ margin: '0 0.5rem' }}>
            <Typography
              weight="semiBold"
              color={colorPalette.primary[700]}
              style={{ display: 'inline-block' }}
            >
              {FoundationDonation.regularDonations.length}개
            </Typography>
            의 재단에 정기 후원하고 있습니다.
          </Typography>
          {FoundationDonation.regularDonations.map((donation, index) => (
            <RegularGive key={index} donation={donation} />
          ))}

          <Typography
            as="h3"
            weight="medium"
            style={{ margin: '1.75rem 0.5rem 0.5rem' }}
          >
            재단에 일시 후원을{' '}
            <Typography
              weight="semiBold"
              color={colorPalette.primary[700]}
              style={{ display: 'inline-block' }}
            >
              {FoundationDonation.oneTimeDonations.length}회
            </Typography>{' '}
            했습니다.
          </Typography>
          {FoundationDonation.oneTimeDonations.map((donation, index) => (
            <OneTimeGive key={index} donation={donation} />
          ))}
        </Box>
      )}
      {selectedCategory === '캠페인 후원' && (
        <Box padding="1.25rem 0.75rem">
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
    </Box>
  );
}
