'use client';

import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import { useRouter } from 'next/navigation';
import { HiOutlineBell } from 'react-icons/hi2';

export default function GiveFootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Layout>
      <header>
        <AppBar title="기부 발자국" onBackClick={goBack}>
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
