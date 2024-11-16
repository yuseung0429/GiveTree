import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <header>
        <AppBar title="상품 결제" showBackButton></AppBar>
      </header>
      <main>{children}</main>
    </Layout>
  );
}
