'use client';

import { useRef, useState } from 'react';
import * as s from './DonationUsage.css';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { FaTree } from 'react-icons/fa';
import colorPalette from '@/styles/tokens/colorPalette';
import Box from '@/components/common/Box';
import Usage from '@/components/myPage/Usage';
import { DonationExpenseItem } from '@/api/donation/getDonationExpense';

interface DonationFoundation {
  foundationId: number;
  foundationName: string;
  totalDonationAmount: number;
}

export default function DonationUsage({
  foundations,
  donationExpenses,
}: {
  foundations: DonationFoundation[];
  donationExpenses: Array<DonationExpenseItem[] | []>;
}) {
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
  return (
    <>
      <div
        className={s.sliderContainer}
        ref={sliderRef}
        onScroll={handleScroll}
      >
        {foundations.map((foundation, index) => (
          <Flex
            key={index}
            flexDirection="column"
            className={s.walletcontainer}
          >
            <Flex alignItems="center" gap="4px">
              <FaTree size={16} color={colorPalette.primary[600]} />
              <Typography weight="semiBold" size={18}>
                {foundation.foundationName}
              </Typography>
            </Flex>
            <Typography
              size={20}
              weight="bold"
              color={colorPalette.primary[600]}
              style={{ textAlign: 'center', margin: '0.5rem 0' }}
            >
              {foundation.totalDonationAmount.toLocaleString()}원
            </Typography>
          </Flex>
        ))}
      </div>
      <div className={s.dotsContainer}>
        {foundations.map((_, index) => (
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
      <Box paddingTop="1rem" marginTop="1rem">
        <Typography
          as="h3"
          weight="semiBold"
          size={18}
          color={colorPalette.text[900]}
          style={{ margin: '0.25rem 0.5rem 1rem' }}
        >
          재단 출금 사용내역
        </Typography>

        <Usage expenses={donationExpenses[currentIndex] || []} />
      </Box>
    </>
  );
}
