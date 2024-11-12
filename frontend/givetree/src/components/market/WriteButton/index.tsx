'use client';

import { useRef } from 'react';

import { HiPencilSquare } from 'react-icons/hi2';

import useIsScrolled from '@/hooks/useIsScrolled';

import Button from '@/components/common/Button';

import * as s from './WriteButton.css';

interface WriteButtonProps {
  onClick?: () => void;
}

const WriteButon = ({ onClick }: WriteButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolled = useIsScrolled(containerRef);

  return (
    <div className={s.container} ref={containerRef}>
      <Button
        className={isScrolled ? s.rounded : s.rectangle}
        onClick={onClick}
      >
        {isScrolled ? <HiPencilSquare size="1.25rem" /> : '글쓰기'}
      </Button>
    </div>
  );
};

export default WriteButon;
