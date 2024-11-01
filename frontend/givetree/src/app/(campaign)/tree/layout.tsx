import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
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
        <NavigationBar />
      </footer>
    </Layout>
  );
}
