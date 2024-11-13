import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="간편계좌 설정" />
      </header>
      {children}
    </Layout>
  );
}
