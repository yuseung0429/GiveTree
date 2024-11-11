'use client';

import Image from 'next/image';
import * as styles from './[id].css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import TabButton from '@/components/common/Tab';
import { use, useEffect, useRef, useState } from 'react';
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
  const tabRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tabRef.current) {
        const offsetTop = tabRef.current.getBoundingClientRect().top;
        setIsSticky(offsetTop <= 60);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    title,
    foundation,
    currentFundraisingAmount,
    targetFundraisingAmount,
    progress,
    titleImageUrl,
    imageUrls,
    startDate,
    endDate,
    introduction,
  } = campaignData || {
    title: '',
    foundation: '',
    currentFundraisingAmount: 0,
    targetFundraisingAmount: 0,
    progress: 0,
    titleImageUrl: '',
    imageUrls: [],
    startDate: '',
    endDate: '',
    introduction: '',
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.coverImgContainer}
        style={{ backgroundImage: `url('${titleImageUrl}')` }}
      >
        <Image
          src={titleImageUrl}
          alt="campaign main image"
          width={250}
          height={250}
          className={styles.coverImg}
        />
      </div>
      <div style={{ padding: '0.5rem 1rem' }}>
        <div ref={tabRef} className={`${isSticky ? styles.stickyBox : ''}`}>
          <Typography
            as="h2"
            weight="semiBold"
            color={colorPalette.text[900]}
            className={styles.title}
          >
            {title}
          </Typography>

          <Typography
            as="h4"
            weight="semiBold"
            color={colorPalette.text[600]}
            className={styles.subTitle}
          >
            {foundation}
          </Typography>
          <div className={styles.periodWrapper}>
            <Typography as="h4" weight="medium" color={colorPalette.text[900]}>
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
        </div>

        {selectedCategory === '소개' && (
          <CampaignInfo
            introduction={introduction}
            introduceImage={imageUrls}
          />
        )}
        {selectedCategory === '모금함' && (
          <CampaignMoney
            progress={progress}
            currentAmount={currentFundraisingAmount}
            goalAmount={targetFundraisingAmount}
          />
        )}
      </div>
    </div>
  );
}
