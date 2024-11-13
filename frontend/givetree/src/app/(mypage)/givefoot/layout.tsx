import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import Link from 'next/link';
import { HiOutlineBell } from 'react-icons/hi2';

export default function GiveFootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="기부 발자국">
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
