import Layout from '@/components/common/Layout';
import MainAppBar from '@/components/common/MainAppBar';
import NavigationBar from '@/components/common/NavigationBar';

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <MainAppBar>GIVE 월렛</MainAppBar>
      </header>

      <main style={{ backgroundColor: '#F5F5F5' }}>{children}</main>

      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
