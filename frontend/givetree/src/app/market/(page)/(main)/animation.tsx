'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { mergeClasses } from '@/utils/mergeClasses';

import FrozenRouter from '@/components/common/FrozenRouter';

import * as s from './@modal/Modal.css';

const MarketAnimation = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const exceptions = ['/notification'];

  return (
    <>
      {/* 리팩토링 필요 */}
      {exceptions.includes(pathname) ? (
        <>{children}</>
      ) : (
        <section>
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={pathname === '/market' ? 'market' : 'modal'}
              initial={{ y: '5%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '5%', opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={mergeClasses(pathname !== '/market' && s.modal)}
            >
              <FrozenRouter key={pathname}>{children}</FrozenRouter>
            </motion.div>
          </AnimatePresence>
        </section>
      )}
    </>
  );
};

export default MarketAnimation;
