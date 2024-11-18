import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="거래 물품 검색" showBackButton></AppBar>
      </header>
      <main>{children}</main>
    </Layout>
  );
}
