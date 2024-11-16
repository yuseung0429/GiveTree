import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="채팅" showBackButton></AppBar>
      </header>
      <main>{children}</main>
    </Layout>
  );
}
