import ConditionalBottomBar from '@/components/foundation/ConditionalBottomBar';
import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';
import MainAppBar from '@/components/common/MainAppBar';
import NavigationBar from '@/components/common/NavigationBar';

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <MainAppBar>GIVE 재단</MainAppBar>
      </header>
      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
