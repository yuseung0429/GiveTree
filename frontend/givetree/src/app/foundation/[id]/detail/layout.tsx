import Layout from '@/components/common/Layout';
import AppBar from '@/components/common/AppBar';
import NavigationBar from '@/components/common/NavigationBar';

export default async function FoundationDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="후원하기" showBackButton />
      </header>

      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
