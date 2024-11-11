'use client';

import CampaignItem from '@/components/myPage/Myfoundation/Campaign/CampaignItem';
import AppBar from '@/components/common/AppBar';
import Flex from '@/components/common/Flex';
import Layout from '@/components/common/Layout';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <Layout>
      <header>
        <AppBar title="캠페인 내역 확인" onBackClick={() => router.back()} />
      </header>
      <main style={{ backgroundColor: '#F5F5F5', padding: '1rem 0' }}>
        <Flex flexDirection="column" gap="1rem">
          <CampaignItem
            name="유기견 보호 캠페인"
            startDate="2024.03.22"
            endDate="2024.05.22"
            targetFundraisingAmount={200000}
            currentFundraisingAmount={150000}
            titleImageUrl="/api/placeholder/400/400"
          />
          <CampaignItem
            name="유기견 보호 캠페인"
            startDate="2024.09.22"
            endDate="2024.12.22"
            targetFundraisingAmount={200000}
            currentFundraisingAmount={300000}
            titleImageUrl="/api/placeholder/400/400"
          />
          <CampaignItem
            name="유기견 보호 캠페인"
            startDate="2024.09.22"
            endDate="2024.12.22"
            targetFundraisingAmount={200000}
            currentFundraisingAmount={100000}
            titleImageUrl="/api/placeholder/400/400"
          />
        </Flex>
      </main>
    </Layout>
  );
}
