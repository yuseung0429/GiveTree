import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function CHatListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="채팅방 목록" showBackButton></AppBar>
      </header>
      <main>{children}</main>
    </Layout>
  );
}
