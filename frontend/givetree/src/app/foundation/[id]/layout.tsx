import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import Layout from '@/components/common/Layout';

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="재단" />
      </header>
      <main>{children}</main>
      <footer>
        <Button fullWidth>후원하기</Button>
      </footer>
    </Layout>
  );
}
