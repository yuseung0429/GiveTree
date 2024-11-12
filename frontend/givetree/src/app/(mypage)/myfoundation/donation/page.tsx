'use client';

import Box from '@/components/common/Box';
import TabButton from '@/components/common/Tab';
import Typography from '@/components/common/Typography';
import MonthDropdown from '@/components/myPage/MonthDropdown';
import CampaignDonation from '@/components/myPage/Myfoundation/Donation/CampaignDonation';
import CampaignFoot from '@/components/myPage/Myfoundation/Donation/CampaignFoot';
import DonationFoot from '@/components/myPage/Myfoundation/Donation/FoundationFoot';
import FoundationDonation from '@/components/myPage/Myfoundation/Donation/FoundationDonation';
import { useState } from 'react';

export default function DonationDetail() {
  const categories = ['재단 후원', '캠페인 후원'];
  const [selectedCategory, setSelectedCategory] = useState('재단 후원');
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const width = `calc(100% / ${categories.length})`;

  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
  };

  return (
    <div>
      {categories.map((category) => (
        <TabButton
          key={category}
          label={category}
          isSelected={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
          width={width}
        />
      ))}
      <Box padding="1rem">
        {selectedCategory === '재단 후원' && (
          <>
            <DonationFoot month={selectedMonth + 1} />
            <Box
              padding="1rem 0.5rem"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography as="h3" weight="semiBold">
                후원 내역
              </Typography>
              <MonthDropdown
                selectedMonth={selectedMonth}
                handleMonthAction={handleMonthChange}
              />
            </Box>
            <FoundationDonation month={selectedMonth + 1} />
          </>
        )}

        {selectedCategory === '캠페인 후원' && (
          <>
            <CampaignFoot />
            <Box
              padding="1rem 0.5rem"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography as="h3" weight="semiBold">
                모금 내역
              </Typography>
              <MonthDropdown
                selectedMonth={selectedMonth}
                handleMonthAction={handleMonthChange}
              />
            </Box>
            <CampaignDonation month={selectedMonth + 1} />
          </>
        )}
      </Box>
    </div>
  );
}
