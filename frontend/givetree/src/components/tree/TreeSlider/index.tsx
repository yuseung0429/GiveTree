'use client';

import { useState, useRef } from 'react';
import * as styles from './treeSlider.css';
import Tree from '@/components/tree/Tree';
import Box from '@/components/common/Box';

const trees = [1, 2, 3, 4]; // Tree 컴포넌트의 개수를 나타내는 배열

export type TreeProps = {
  messages: MessageContent[];
};

export interface MessageContent {
  message: string;
  from: string;
}

export default function TreeSlider({messages} :TreeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const startX = useRef(0);
  const moveX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    moveX.current = e.touches[0].clientX - startX.current;
  };

  const handleTouchEnd = () => {
    if (moveX.current < -50 && currentIndex < trees.length - 1) {
      // 오른쪽으로 스와이프 시 현재 슬라이드가 마지막이 아니면 이동
      setIsFlipping((prev) => !prev);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 300);
    } else if (moveX.current > 50 && currentIndex > 0) {
      // 왼쪽으로 스와이프 시 현재 슬라이드가 첫 번째가 아니면 이동
      setIsFlipping((prev) => !prev);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
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
      <Box className={`${styles.treeImage} ${isFlipping ? styles.flip : ''}`}>
        <Tree messages={messages} />
      </Box>

      <div className={styles.pagination}>
        {trees.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.activeDot : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
