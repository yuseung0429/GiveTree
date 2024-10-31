import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * 페이지에 따라 NavBar가 필요한 경우도 있고, 필요 없는 경우가 있어서 RootLayout에 NavBar를 정의하지 않았음.
   */
  return (
    // Layout 컴포넌트는 main 태그를 기준으로 크기를 화면에 맞추므로 반드시 main 태그를 정의해야 함!!
    <Layout>
      <header>
        <AppBar>top</AppBar>
      </header>
      <main>{children}</main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
