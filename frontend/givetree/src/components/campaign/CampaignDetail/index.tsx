'use client';

import CampaignInfo from '@/components/campaign/CampaignInfo';
import CampaignMoney from '@/components/campaign/CampaignMoney';
import TabButton from '@/components/common/Tab';
import { useState } from 'react';

const categories = ['소개', '모금함'];

interface CampaignDetailProps {
  id: number;
  role: string;
  introduction: string;
  imageUrls: string[];
  currentFundraisingAmount: number;
  targetFundraisingAmount: number;
  endDate: string;
}

export default function CampaignDetail({
  id,
  role,
  introduction,
  imageUrls,
  currentFundraisingAmount,
  targetFundraisingAmount,
  endDate,
}: CampaignDetailProps) {
  const [selectedCategory, setSelectedCategory] = useState('소개');
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

      {selectedCategory === '소개' && (
        <CampaignInfo introduction={introduction} introduceImage={imageUrls} />
      )}
      {selectedCategory === '모금함' && (
        <CampaignMoney
          id={id}
          role={role}
          currentAmount={currentFundraisingAmount}
          goalAmount={targetFundraisingAmount}
          endDate={endDate}
        />
      )}
    </>
  );
}
