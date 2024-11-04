'use client';

import Image from 'next/image';
import * as styles from './[id].css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import TabButton from '@/components/common/Tab';
import { use, useState } from 'react';
import CampaignInfo from '@/components/campaign/CampaignInfo';
import CampaignMoney from '@/components/campaign/CampaignMoney';
import campaigns from '@/mock/campaigns.json';

const categories = ['소개', '모금함'];

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const campaignId = parseInt(unwrappedParams.id, 10);
  const campaignData = campaigns.find((data) => data.id === campaignId);
  const [selectedCategory, setSelectedCategory] = useState('소개');
  const width = `calc(100% / ${categories.length})`;

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
  } = campaignData || {
    title: '',
    foundation: '',
    currentAmount: 0,
    goalAmount: 0,
    progress: 0,
    imageUrl: '',
    introduceImage: '',
    startDate: '',
    endDate: '',
    introduction: '',
  };

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
