import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import Link from 'next/link';
import { HiOutlineBell } from 'react-icons/hi2';

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="재단 소개">
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
