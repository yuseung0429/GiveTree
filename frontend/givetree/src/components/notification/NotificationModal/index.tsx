'use client';

import { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import * as s from './NotificationModal.css';

interface NotificationModalProps {
  children: ReactNode;
}

const NotificationModal = ({ children }: NotificationModalProps) => {
  const router = useRouter();

  return (
    <div className={s.backdrop} onClick={() => router.back()}>
      <div className={s.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default NotificationModal;
