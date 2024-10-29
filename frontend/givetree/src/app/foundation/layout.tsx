import AppBar from '@/components/common/AppBar';
import BottomBar from '@/components/common/BottomBar';
import Layout from '@/components/common/Layout';

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar>top</AppBar>
      </header>
      <main>{children}</main>
      <footer>
        <BottomBar>bottom</BottomBar>
      </footer>
    </Layout>
  );
}
