'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { HiPencilSquare } from 'react-icons/hi2';

import useIsScrolled from '@/hooks/useIsScrolled';

import Button from '@/components/common/Button';

import * as s from './WriteButton.css';

interface WriteButtonProps {
  href: string;
  onClick?: () => void;
}

const WriteButon = ({ href, onClick }: WriteButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolled = useIsScrolled(containerRef);

  return (
    <div className={s.container} ref={containerRef}>
      <Link href={href}>
        <Button
          className={isScrolled ? s.rounded : s.rectangle}
          onClick={onClick}
        >
          {isScrolled ? <HiPencilSquare size="1.25rem" /> : '글쓰기'}
        </Button>
      </Link>
    </div>
  );
};

export default WriteButon;
