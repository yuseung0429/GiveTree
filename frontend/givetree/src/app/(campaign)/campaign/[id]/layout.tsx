"use client";

import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import AppBar from '@/components/common/AppBar';
import { HiOutlineBell } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import campaigns from '@/mock/campaigns.json';
import { use } from 'react';

export default function AuthLayout({
  children, params
}: {
  children: React.ReactNode; params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const campaignId = parseInt(unwrappedParams.id, 10);
  const campaignData = campaigns.find((data) => data.id === campaignId);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  /**
   * 페이지에 따라 NavBar가 필요한 경우도 있고, 필요 없는 경우가 있어서 RootLayout에 NavBar를 정의하지 않았음.
   */
  return (
    // Layout 컴포넌트는 main 태그를 기준으로 크기를 화면에 맞추므로 반드시 main 태그를 정의해야 함!!
    <Layout>
      <header>
        <AppBar title={campaignData?.title || "" } onBackClick={goBack}>
          <AppBar.Menu onClick={() => alert('알림')}>
            <HiOutlineBell />
          </AppBar.Menu>
        </AppBar>
      </header>
      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
