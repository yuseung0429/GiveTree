'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import AccountInfo from './flows/AccountInfo';
import FoundationInfo from './flows/FoundationInfo';
import FoundationIntro from './flows/FoundationIntro';
import ProgressIndicator from '@/components/common/ProgressIndicator';
import Box from '@/components/common/Box';

export default function FoundationSignUp() {
  const [step, setStep] = useState<number>(0);

  const changeStep = (step: number) => {
    navigator.vibrate(10);
    setStep(step);
  };

  return (
    <>
      <ProgressIndicator value={step} max={3} />
      <Box padding="1rem">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {
              [
                <AccountInfo key={0} onSubmit={() => changeStep(1)} />,
                <FoundationInfo key={1} onSubmit={() => changeStep(2)} />,
                <FoundationIntro key={2} onSubmit={() => changeStep(0)} />,
              ][step]
            }
          </motion.div>
        </AnimatePresence>
      </Box>
    </>
  );
}
