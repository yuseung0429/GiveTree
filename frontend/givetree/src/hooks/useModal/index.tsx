'use client';

import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import ModalList, { ModalListRef } from './ModalList';

type ModalState = 'ACTIVE' | 'FADEOUT';

export type ModalAnimation = 'center' | 'bottom' | 'alert';

export interface ModalPushProps {
  children: ReactElement;
  animation?: ModalAnimation;
  onClose?: () => void;
}

export interface ModalData extends ModalPushProps {
  id: number;
  state: ModalState;
  onFadeOutEnd?: () => void;
}

interface ModalContextType {
  push: (data: ModalPushProps) => void;
  pop: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const modalListRef = useRef<ModalListRef>(null);

  const push = useCallback(
    (data: ModalPushProps) => {
      if (!modalListRef.current) {
        return;
      }

      modalListRef.current.push(data);
    },
    [modalListRef]
  );

  const pop = useCallback(() => {
    if (!modalListRef.current) {
      return;
    }

    modalListRef.current.pop();
  }, [modalListRef]);

  const contextValue = useMemo(() => {
    return { push, pop };
  }, [push, pop]);

  useEffect(() => {
    const handlePopState = () => {
      pop();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pop]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalList ref={modalListRef} />
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const modalContext = useContext(ModalContext);

  const pop = useCallback(() => {
    window.history.back();
  }, []);

  const push = useCallback(
    (props: ModalPushProps) => {
      if (!modalContext) {
        return;
      }

      modalContext.push(props);
    },
    [modalContext]
  );

  return useMemo(() => {
    return { push, pop };
  }, [pop, push]);
};

export default useModal;
