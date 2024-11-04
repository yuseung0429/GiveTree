'use client';

import { usePathname, useRouter } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

import { HiMagnifyingGlass, HiOutlineBell } from 'react-icons/hi2';

import * as s from './Market.css';

import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';
import NavigationBar from '@/components/common/NavigationBar';
import FrozenRouter from '@/components/common/FrozenRouter';
import { mergeClasses } from '@/utils/mergeClasses';

export default function MarketLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Layout>
      <header>
        <AppBar title="거래">
          <AppBar.Menu onClick={() => router.push('/market/search')}>
            <HiMagnifyingGlass />
          </AppBar.Menu>
          <AppBar.Menu onClick={() => alert('알림')}>
            <HiOutlineBell />
          </AppBar.Menu>
        </AppBar>
      </header>
      <main>
        <section>{children}</section>
        <section>
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={pathname}
              initial={{ y: '15%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '15%', opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={mergeClasses(pathname !== '/market' && s.modal)}
            >
              <FrozenRouter>{modal}</FrozenRouter>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
