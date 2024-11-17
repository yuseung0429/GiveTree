import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="캠페인트리 환전하기" showBackButton />
      </header>
      <main style={{ backgroundColor: '#F5F5F5' }}>{children}</main>
    </Layout>
  );
}
