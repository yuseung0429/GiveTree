'use client';

import TabButton from '@/components/common/Tab';
import * as style from './detail.css';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import { useState } from 'react';
import IntroTab from '@/components/foundation/detail/IntroTab';
import DonationTab from '@/components/foundation/detail/DonationTab';
import CampaignTab from '@/components/foundation/detail/CampaignTab';
import Layout from '@/components/common/Layout';
import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import DonationModal from '@/components/foundation/detail/DonationModal';

const categories = ['소개', '모금함', '캠페인'];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState('소개');
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Layout>
      {/* header */}
      <header>
        <AppBar title="재단" />
      </header>

      {/* main */}
      <main>
        <Flex flexDirection="column">
          <Box as="section" className={style.fixBox}>
            {/* 상단 배너 */}
            <Box className={style.foundationBanner}>단체 대표사진</Box>

            {/* 탭 */}
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

          {/* 탭 하위 컴포넌트 */}
          <Box as="section" className={style.tabContentContainer}>
            {selectedCategory === '소개' && <IntroTab />}
            {selectedCategory === '모금함' && <DonationTab />}
            {selectedCategory === '캠페인' && <CampaignTab />}
          </Box>
        </Flex>
      </main>

      {/* footer */}
      <footer style={{ padding: '10px' }}>
        <Button size="xl" fullWidth onClick={openModal}>
          후원하기
        </Button>
      </footer>

      {/* 모달 */}
      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </Layout>
  );
}
