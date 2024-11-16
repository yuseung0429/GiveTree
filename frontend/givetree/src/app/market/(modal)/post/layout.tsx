import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="거래글" showBackButton></AppBar>
      </header>
      <main>{children}</main>
    </Layout>
  );
}
