'use client';

import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

import FrozenRouter from '@/components/common/FrozenRouter';
import Layout from '@/components/common/Layout';
import AppBar from '@/components/common/AppBar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  return (
    <Layout>
      <header>
        <AppBar title="Give Tree" onBackClick={() => router.back()} />
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
