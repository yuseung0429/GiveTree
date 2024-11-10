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
          <CampaignItem />
          <CampaignItem />
          <CampaignItem />
          <CampaignItem />
        </Flex>
      </main>
    </Layout>
  );
}
