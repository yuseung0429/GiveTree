import Layout from '@/components/common/Layout';
import AppBar from '@/components/common/AppBar';
import NavigationBar from '@/components/common/NavigationBar';
import fetchWrapper from '@/lib/fetchWrapper';

export default async function FoundationDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const foundationId = (await params).id;
  const response = await fetchWrapper(`/foundations/${foundationId}`, {
    method: 'GET',
  });
  const foundation = await response.json();

  return (
    <Layout>
      <header>
        <AppBar title={foundation.name} showBackButton />
      </header>

      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
