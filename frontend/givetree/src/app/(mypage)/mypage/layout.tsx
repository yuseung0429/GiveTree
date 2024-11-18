import Layout from '@/components/common/Layout';
import MainAppBar from '@/components/common/MainAppBar';
import NavigationBar from '@/components/common/NavigationBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GiveTree',
  description: 'GiveTree',
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <MainAppBar>마이페이지</MainAppBar>
      </header>
      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
