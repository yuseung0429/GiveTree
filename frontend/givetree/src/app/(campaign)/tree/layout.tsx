import BottomBar from '@/components/common/BottomBar';
import Layout from '@/components/common/Layout';
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
      <main>{children}</main>
      <footer>
        <BottomBar>bottom</BottomBar>
      </footer>
    </Layout>
  );
}
