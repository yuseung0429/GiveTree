'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import AccountInfo from './flows/AccountInfo';
import FoundationInfo from './flows/FoundationInfo';
import ProgressIndicator from '@/components/common/ProgressIndicator';
import Box from '@/components/common/Box';

import * as s from '../Auth.css';
import Flex from '@/components/common/Flex';

export default function FoundationSignUp() {
  const [step, setStep] = useState<number>(0);

  const changeStep = (step: number) => {
    navigator.vibrate(10);
    setStep(step);
  };

  return (
    <Flex flexDirection="column" height="100%">
      <div style={{ flex: '0 0 auto' }}>
        <ProgressIndicator value={step} max={2} />
      </div>
      <Box padding="1rem" style={{ flex: '1 1 auto', overflow: 'auto' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ height: '100%' }}
          >
            <div className={s.pageContainer} key={0}>
              {
                [
                  <AccountInfo key={0} onSubmit={() => changeStep(1)} />,
                  <FoundationInfo key={1} onSubmit={() => changeStep(0)} />,
                ][step]
              }
            </div>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Flex>
  );
}
