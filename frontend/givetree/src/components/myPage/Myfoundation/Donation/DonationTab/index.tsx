'use client';

import { DonationDetailItem } from '@/api/donation/getDonationDetail';
import { FoundationStatistic } from '@/api/donation/getFoundationStatistic';
import Box from '@/components/common/Box';
import * as s from './DonationTab.css';
import TabButton from '@/components/common/Tab';
import Typography from '@/components/common/Typography';
import MonthDropdown from '@/components/myPage/MonthDropdown';
import CampaignDonation from '@/components/myPage/Myfoundation/Donation/CampaignDonation';
import CampaignFoot from '@/components/myPage/Myfoundation/Donation/CampaignFoot';
import FoundationDonation from '@/components/myPage/Myfoundation/Donation/FoundationDonation';
import DonationFoot from '@/components/myPage/Myfoundation/Donation/FoundationFoot';
import { useRef, useState } from 'react';
import { CampaignData } from '@/types/campaign/types';
import colorPalette from '@/styles/tokens/colorPalette';
import { CampaignStatistic } from '@/api/donation/getCampaignStatistic';
import { CampaignDonationItem } from '@/api/donation/getCampaignDonation';

interface DonationTabProps {
  statistics: Array<FoundationStatistic[]>;
  donationDetail: Array<DonationDetailItem[]>;
  campaigns: CampaignData[] | [];
  campaignStatistics: Array<CampaignStatistic>;
  campaignDonation: Array<CampaignDonationItem[] | []>;
}

export default function DonationTab({
  statistics,
  donationDetail,
  campaigns,
  campaignStatistics,
  campaignDonation,
}: DonationTabProps) {
  const categories = ['재단 후원', '캠페인 후원'];
  const [selectedCategory, setSelectedCategory] = useState('재단 후원');
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const width = `calc(100% / ${categories.length})`;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    setCurrentIndex(
      Math.floor(
        (slider.scrollLeft + (slider.offsetWidth + 16) / 2) /
          (slider.offsetWidth + 16)
      )
    );
  };

  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
  };

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
      <Box padding="1rem">
        {selectedCategory === '재단 후원' && (
          <>
            <DonationFoot month={selectedMonth + 1} statistics={statistics} />
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
            <FoundationDonation
              month={selectedMonth + 1}
              donationDetails={donationDetail}
            />
          </>
        )}

        {selectedCategory === '캠페인 후원' && (
          <>
            <div
              className={s.sliderContainer}
              ref={sliderRef}
              onScroll={handleScroll}
            >
              {campaigns.length !== 0 ? (
                <div style={{ width: '100%' }}>
                  <CampaignFoot
                    campaign={campaigns[currentIndex]}
                    campaignStatistics={campaignStatistics}
                    currentIndex={currentIndex}
                  />
                </div>
              ) : (
                <div>
                  <Typography>진행 중인 캠페인이 없습니다.</Typography>
                </div>
              )}
            </div>
            <div className={s.dotsContainer}>
              {campaigns.map((_, index) => (
                <div
                  key={index}
                  className={`${s.dot}`}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    backgroundColor:
                      currentIndex === index
                        ? colorPalette.primary[600]
                        : colorPalette.text[100],
                  }}
                ></div>
              ))}
            </div>
            <Box
              padding="0.5rem 0.5rem 1rem"
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
            </Box>
            <CampaignDonation
              currentIndex={currentIndex}
              campaignDonation={campaignDonation}
            />
          </>
        )}
      </Box>
    </>
  );
}
