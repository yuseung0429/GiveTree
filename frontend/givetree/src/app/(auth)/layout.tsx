'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

import AppBar from '@/components/common/AppBar';
import FrozenRouter from '@/components/common/FrozenRouter';
import Layout from '@/components/common/Layout';

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  return (
    <Layout>
      <header>
        <AppBar>Give Tree</AppBar>
      </header>

      <main>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={segment}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: '0' }}
          >
            <FrozenRouter>{children}</FrozenRouter>
          </motion.div>
        </AnimatePresence>
      </main>
    </Layout>
  );
}
