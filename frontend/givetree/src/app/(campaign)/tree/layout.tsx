import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';

export default function TreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
