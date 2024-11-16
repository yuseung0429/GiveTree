import Link from 'next/link';

import { HiMagnifyingGlass, HiOutlineBell } from 'react-icons/hi2';

import MarketAnimation from './animation';
import AppBar from '@/components/common/AppBar';
import AppBarMenu from '@/components/common/AppBarMenu';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';

export default function MarketLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="거래">
          <Link href="/market/search">
            <AppBarMenu>
              <HiMagnifyingGlass />
            </AppBarMenu>
          </Link>
          <Link href="/notification">
            <AppBarMenu>
              <HiOutlineBell />
            </AppBarMenu>
          </Link>
        </AppBar>
      </header>
      <main>
        <section style={{ height: '100%' }}>{children}</section>
        <MarketAnimation>{modal}</MarketAnimation>
      </main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
