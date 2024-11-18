import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="판매글 작성" showBackButton></AppBar>
      </header>
      <main>{children}</main>
    </Layout>
  );
}
