import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { ModalData, ModalPushProps } from '.';

import Modal from './Modal';

export interface ModalListRef {
  pop: () => void;
  push: ({ children, animation, onClose }: ModalPushProps) => void;
}

const ModalList = forwardRef<ModalListRef>((_, ref) => {
  const [modals, setModals] = useState<ModalData[]>([]);

  const countRef = useRef<number>(0);

  useImperativeHandle(
    ref,
    () => {
      return {
        pop() {
          for (let i = modals.length - 1; i >= 0; i--) {
            if (modals[i].state === 'FADEOUT') {
              continue;
            }

            modals[i].state = 'FADEOUT';
            modals[i].onFadeOutEnd = () => {
              setModals((modals) =>
                modals.filter((modal) => {
                  if (modal === modals[i] && modal.onClose) {
                    modal.onClose();
                  }

                  return modal !== modals[i];
                })
              );
            };

            setModals([...modals]);
            return;
          }
        },

        push({ children, animation, onClose }: ModalPushProps) {
          setModals((modals) => [
            ...modals,
            {
              state: 'ACTIVE',
              id: ++countRef.current,
              children,
              animation,
              onClose,
            },
          ]);
          window.history.pushState({}, '', '');
        },
      };
    },
    [modals]
  );

  return (
    <>
      {modals.map((modal) => (
        <Modal key={modal.id} {...modal} />
      ))}
    </>
  );
});

ModalList.displayName = 'ModalList';

export default ModalList;
