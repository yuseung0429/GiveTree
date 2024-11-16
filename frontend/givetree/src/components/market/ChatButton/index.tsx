'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { HiChatBubbleOvalLeft } from 'react-icons/hi2';

import Button from '@/components/common/Button';

import * as s from './ChatButton.css';

interface ChatButtonProps {
  href: string;
  onClick?: () => void;
}

const ChatButon = ({ href, onClick }: ChatButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={s.container} ref={containerRef}>
      <Link href={href}>
        <Button className={s.rounded} onClick={onClick}>
          <HiChatBubbleOvalLeft size="1.25rem" />
        </Button>
      </Link>
    </div>
  );
};

export default ChatButon;
