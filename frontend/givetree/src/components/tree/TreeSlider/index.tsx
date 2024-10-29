'use client';

import { useState, useRef, useEffect } from 'react';
import * as styles from './treeSlider.css';
import Tree from '@/components/tree/Tree';

const trees = [1, 2, 3, 4]; // Tree 컴포넌트의 개수를 나타내는 배열

export type TreeProps = {
  initialMessages: MessageContent[];
};

export interface MessageContent {
  message: string;
  from: string;
}

export default function TreeSlider({ initialMessages }: TreeProps) {
  const [messages, setMessages] = useState<MessageContent[]>(initialMessages);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showDecorations, setShowDecorations] = useState(true);
  const startX = useRef(0);
  const moveX = useRef(0);

  useEffect(() => {
    if (currentPage !== 1) {
      setMessages(messages);
    }
  }, [currentPage, messages]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    moveX.current = e.touches[0].clientX - startX.current;
  };

  const handleTouchEnd = () => {
    if (moveX.current < -50 && currentPage < trees.length) {
      // 오른쪽으로 스와이프 시 현재 슬라이드가 마지막이 아니면 이동
      setIsFlipping((prev) => !prev);
      setShowDecorations(false);
      setTimeout(() => {
        setCurrentPage((prevIndex) => prevIndex + 1);
        setShowDecorations(true);
      }, 300);
    } else if (moveX.current > 50 && currentPage > 1) {
      // 왼쪽으로 스와이프 시 현재 슬라이드가 첫 번째가 아니면 이동
      setIsFlipping((prev) => !prev);
      setShowDecorations(false);
      setTimeout(() => {
        setCurrentPage((prevIndex) => prevIndex - 1);
        setShowDecorations(true);
      }, 300);
    }
    moveX.current = 0;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Tree
        messages={messages}
        isFlipping={isFlipping}
        showDecorations={showDecorations}
      />

      <div className={styles.pagination}>
        {trees.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              currentPage - 1 === index ? styles.activeDot : ''
            }`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </div>
  );
}
