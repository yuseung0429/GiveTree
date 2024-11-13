import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import fetchWrapper from '@/lib/fetchWrapper';
import AppBar from '@/components/common/AppBar';
import Link from 'next/link';
import { HiOutlineBell } from 'react-icons/hi2';

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const campaignId = (await params).id;
  const response = await fetchWrapper(`/campaigns/${campaignId}`, {
    method: 'GET',
  });
  const campaign = await response.json();

  return (
    <Layout>
      <header>
        <AppBar title={campaign.name}>
          <Link href={'/notification'}>
            <AppBar.Menu>
              <HiOutlineBell />
            </AppBar.Menu>
          </Link>
        </AppBar>
      </header>
      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
