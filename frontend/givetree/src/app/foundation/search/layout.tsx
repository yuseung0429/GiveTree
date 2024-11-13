import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="재단 검색" />
      </header>
      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
