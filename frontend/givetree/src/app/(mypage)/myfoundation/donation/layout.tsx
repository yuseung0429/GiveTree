import AppBar from '@/components/common/AppBar';
import AppBarMenu from '@/components/common/AppBarMenu';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import Link from 'next/link';

import { HiOutlineBell } from 'react-icons/hi2';

export default function DonationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="후원 내역">
          <Link href={'/notification'}>
            <AppBarMenu>
              <HiOutlineBell />
            </AppBarMenu>
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
