'use client';

import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

import useDialog from '@/hooks/useDialog';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import ProgressIndicator from '@/components/common/ProgressIndicator';
import AccountInfo from './flows/AccountInfo';
import FoundationInfo from './flows/FoundationInfo';

import * as s from '../Auth.css';

export default function FoundationSignUp() {
  const { alert } = useDialog();

  const router = useRouter();

  const [step, setStep] = useState<number>(0);

  const formDataRef = useRef<FormData>(new FormData());

  const changeStep = (step: number) => {
    navigator.vibrate(10);
    setStep(step);
  };

  const handleAccountInfoSubmit = (formData: FormData) => {
    formData.forEach((value, key) => {
      formDataRef.current.set(key, value);
    });

    changeStep(1);
  };

  const handleFoundationInfoSubmit = async () => {
    await alert('재단 계정 가입을 완료했습니다.');
    router.push('/foundation-signin');
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
                  <AccountInfo
                    key={0}
                    formData={formDataRef.current}
                    onSubmit={handleAccountInfoSubmit}
                  />,
                  <FoundationInfo
                    key={1}
                    formData={formDataRef.current}
                    onBackClick={() => setStep(0)}
                    onSubmit={handleFoundationInfoSubmit}
                  />,
                ][step]
              }
            </div>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Flex>
  );
}
