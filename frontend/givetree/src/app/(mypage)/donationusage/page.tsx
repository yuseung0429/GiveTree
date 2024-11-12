'use client';

import { useRef, useState } from 'react';

import Box from '@/components/common/Box';
import * as s from './usage.css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Flex from '@/components/common/Flex';
import { FaTree } from 'react-icons/fa';
import Usage from '@/components/myPage/Usage';

const foundations = [
  { foundationName: '굿네이버스', totalDonation: 100000 },
  { foundationName: '사랑의 열매', totalDonation: 150000 },
  { foundationName: '초록우산 어린이 재단', totalDonation: 200000 },
];

export default function DonationUsage() {
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
      <Box className={s.grabox}>
        <Typography
          as="h3"
          weight="medium"
          color="#fff"
          style={{ marginLeft: '0.5rem' }}
        >
          내가 후원한 재단
        </Typography>
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
                style={{ textAlign: 'center', marginTop: '1rem' }}
              >
                {foundation.totalDonation.toLocaleString()}원
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
      </Box>
      <Box padding="1rem">
        <Typography
          as="h3"
          weight="semiBold"
          color={colorPalette.text[900]}
          style={{ margin: '0 0.5rem 0.75rem' }}
        >
          출금 사용내역
        </Typography>

        <Usage />
      </Box>
    </>
  );
}
