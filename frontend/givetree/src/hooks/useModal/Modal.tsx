import React, { useEffect, useRef } from 'react';

import { ModalData } from '.';

import styles from './Modal.module.css';

type ModalProps = ModalData;

const Modal = ({
  children,
  state,
  animation = 'alert',
  onFadeOutEnd,
}: ModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const classNames = {
    base: styles[`${animation}-base`],
    enter: styles[`${animation}-enter`],
    exit: styles[`${animation}-exit`],
  };

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    if (state === 'ACTIVE') {
      wrapperRef.current.className = classNames.base;
      // eslint-disable-next-line
      wrapperRef.current.offsetTop;
      wrapperRef.current?.classList.add(classNames.enter);

      return;
    }

    wrapperRef.current.className = `${classNames.base} ${classNames.exit}`;
  }, [
    state,
    animation,
    wrapperRef,
    classNames.base,
    classNames.enter,
    classNames.exit,
  ]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== wrapperRef.current) {
      return;
    }

    if (state === 'FADEOUT' && onFadeOutEnd) {
      onFadeOutEnd();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    if (e.target !== wrapperRef.current || state === 'FADEOUT') {
      return;
    }

    window.history.back();
  };

  return (
    <div
      ref={wrapperRef}
      onTransitionEnd={handleTransitionEnd}
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
