import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import fetchWrapper from '@/lib/fetchWrapper';
import CampaignAppBar from '@/components/campaign/CampaignAppBar';

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
        <CampaignAppBar campaign={campaign} />
      </header>
      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
