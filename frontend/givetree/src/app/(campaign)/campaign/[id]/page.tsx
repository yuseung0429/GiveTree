'use client';

import Image from 'next/image';
import * as styles from './[id].css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import TabButton from '@/components/common/Tab';
import { useState } from 'react';
import CampaignInfo from '@/components/campaign/CampaignInfo';
import CampaignMoney from '@/components/campaign/CampaignMoney';

const mockData = {
  id: 1,
  title: '희망 나눔 캠페인',
  foundation: '사랑의 열매',
  currentAmount: 5400000,
  goalAmount: 15000000,
  progress: 36,
  imageUrl: '/images/campaign/poster.png',
  introduceImage: '/images/campaign/introducePoster.png',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  introduction: '어려운 이웃에게 희망을 전달하는 사랑의 열매 캠페인입니다.',
};

const categories = ['소개', '모금함'];

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const {
    title,
    foundation,
    currentAmount,
    goalAmount,
    progress,
    imageUrl,
    introduceImage,
    startDate,
    endDate,
    introduction,
  } = mockData;

  // const { id } = await params;
  const [selectedCategory, setSelectedCategory] = useState('소개');
  const width = `calc(100% / ${categories.length})`;

  return (
    <div className={styles.container}>
      <div
        className={styles.coverImgContainer}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <Image
          src={imageUrl}
          alt="campaign main image"
          width={250}
          height={250}
          className={styles.coverImg}
        />
      </div>
      <div style={{ padding: '0.5rem 1rem' }}>
        <Typography
          as="h2"
          weight="bold"
          color={colorPalette.text[900]}
          className={styles.title}
        >
          {title}
        </Typography>
        <Typography
          as="h4"
          weight="semiBold"
          color={colorPalette.text[900]}
          className={styles.subTitle}
        >
          {foundation}
        </Typography>
        <div className={styles.periodWrapper}>
          <Typography as="h4" weight="semiBold" color={colorPalette.text[800]}>
            모금기간 &nbsp;|&nbsp; {startDate} ~ {endDate}
          </Typography>
        </div>
        {categories.map((category) => (
          <TabButton
            key={category}
            label={category}
            isSelected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            width={width}
          />
        ))}
        {selectedCategory === '소개' && (
          <CampaignInfo
            introduction={introduction}
            introduceImage={introduceImage}
          />
        )}
        {selectedCategory === '모금함' && (
          <CampaignMoney
            progress={progress}
            currentAmount={currentAmount}
            goalAmount={goalAmount}
          />
        )}
      </div>
    </div>
  );
}
