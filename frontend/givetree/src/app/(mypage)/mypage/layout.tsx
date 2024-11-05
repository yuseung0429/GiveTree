import Layout from '@/components/common/Layout';
import MainAppBar from '@/components/common/MainAppBar';
import NavigationBar from '@/components/common/NavigationBar';
import colorPalette from '@/styles/tokens/colorPalette';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GiveTree',
  description: 'GiveTree',
};

export default function TreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <MainAppBar>마이페이지</MainAppBar>
      </header>
      <main
        style={{
          background: `linear-gradient(to top, ${colorPalette.primary[700]} 70%, ${colorPalette.primary[300]})`,
        }}
      >
        {children}
      </main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
