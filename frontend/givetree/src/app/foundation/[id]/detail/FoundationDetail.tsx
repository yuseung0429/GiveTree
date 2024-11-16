'use client';

import { Foundation } from '@/api/foundation/getFoundationDetail';
import { LedgerResponse } from '@/api/ledger/getLedger';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import TabButton from '@/components/common/Tab';
import CampaignTab from '@/components/foundation/detail/CampaignTab';
import DonationModal from '@/components/foundation/detail/DonationModal';
import DonationTab from '@/components/foundation/detail/DonationTab';
import IntroTab from '@/components/foundation/detail/IntroTab';
import Image from 'next/image';
import { useState } from 'react';
import * as style from './detail.css';

const categories = ['소개', '모금함', '캠페인'];

interface FoundationDetailProps {
  foundationData: Foundation;
  ledgerData: LedgerResponse;
}

export default function FoundationDetailComponent({
  foundationData,
  ledgerData,
}: FoundationDetailProps) {
  const [selectedCategory, setSelectedCategory] = useState('소개');
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
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

            <Box className={style.LogoImg}>
              {foundationData.profileImageUrl ? (
                <Image
                  src={foundationData.profileImageUrl}
                  alt="재단 로고"
                  fill
                  sizes="70px"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '100%',
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
                    borderRadius: '100%',
                  }}
                >
                  로고
                </Flex>
              )}
            </Box>
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
          {selectedCategory === '모금함' && (
            <DonationTab
              foundationData={foundationData}
              ledgerData={ledgerData}
            />
          )}
          {selectedCategory === '캠페인' && (
            <CampaignTab foundationData={foundationData} />
          )}
        </Box>
      </Flex>
      <div className={style.giveButton}>
        <Button size="xl" fullWidth onClick={openModal}>
          후원하기
        </Button>
      </div>
      <DonationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        foundationId={foundationData.id}
      />
    </>
  );
}
