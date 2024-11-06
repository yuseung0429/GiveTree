'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import * as styles from './alarm.css';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onClose() {
    router.back();
  }

  return (
    <div className={styles.modalBackdrop}>
      <dialog ref={dialogRef} className={styles.modal} onClose={onClose}>
        {children}
        <button onClick={onClose} className={styles.closeButton} />
      </dialog>
    </div>
  );
}
