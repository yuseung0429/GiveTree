'use client';

import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

import AppBar from '@/components/common/AppBar';
import NavigationBar from '@/components/common/NavigationBar';
import Layout from '@/components/common/Layout';
import FrozenRouter from '@/components/common/FrozenRouter';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Layout>
      <header>
        <AppBar>top</AppBar>
      </header>

      <main>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={pathname}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: '0' }}
            onAnimationStart={() => navigator.vibrate(10)}
          >
            <FrozenRouter>{children}</FrozenRouter>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer>
        <NavigationBar />
      </footer>
    </Layout>
  );
}
