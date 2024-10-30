import ConditionalBottomBar from '@/app/foundation/ConditionalBottomBar';
import AppBar from '@/components/common/AppBar';
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
        <ConditionalBottomBar />
      </footer>
    </Layout>
  );
}
