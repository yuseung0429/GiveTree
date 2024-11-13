'use client';

import { useState } from 'react';
import TabButton from '@/components/common/Tab';
import * as style from './detail.css';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import IntroTab from '@/components/foundation/detail/IntroTab';
import DonationTab from '@/components/foundation/detail/DonationTab';
import CampaignTab from '@/components/foundation/detail/CampaignTab';
import { Foundation } from '@/api/foundation/getFoundationDetail';
import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';
import Button from '@/components/common/Button';
import DonationModal from '@/components/foundation/detail/DonationModal';
import Image from 'next/image';

const categories = ['소개', '모금함', '캠페인'];

interface FoundationDetailProps {
  foundationData: Foundation;
}

export default function FoundationDetailComponent({
  foundationData,
}: FoundationDetailProps) {
  const [selectedCategory, setSelectedCategory] = useState('소개');
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Layout>
      <header>
        <AppBar title={foundationData.name} />
      </header>

      <main>
        <Flex flexDirection="column">
          <Box as="section" className={style.fixBox}>
            <Box className={style.foundationBanner}>
              {foundationData.titleImageUrl ? (
                <Image
                  src={foundationData.titleImageUrl}
                  alt="단체 대표사진"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                  }}
                  priority
                />
              ) : (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  단체 대표사진
                </Flex>
              )}
            </Box>

            <Box>
              <Flex>
                {categories.map((category) => (
                  <TabButton
                    key={category}
                    label={category}
                    isSelected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                    width="calc(100% / 3)"
                  />
                ))}
              </Flex>
            </Box>
          </Box>

          <Box as="section" className={style.tabContentContainer}>
            {selectedCategory === '소개' && (
              <IntroTab foundationData={foundationData} />
            )}
            {selectedCategory === '모금함' && <DonationTab />}
            {selectedCategory === '캠페인' && <CampaignTab />}
          </Box>
        </Flex>
      </main>

      <footer style={{ padding: '10px' }}>
        <Button size="xl" fullWidth onClick={openModal}>
          후원하기
        </Button>
      </footer>

      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </Layout>
  );
}
