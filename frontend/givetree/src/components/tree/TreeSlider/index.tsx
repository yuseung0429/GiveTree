'use client';

import Tree from '@/components/tree/Tree';
import { TreeMessage } from '@/types/tree/types';
import { useRef, useState } from 'react';
import useSWR from 'swr';
import * as styles from './treeSlider.css';

type TreeProps = {
  page: number;
  campaignId: number;
  totalCount: number;
};

export default function TreeSlider({
  page,
  campaignId,
  totalCount,
}: TreeProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [showDecorations, setShowDecorations] = useState(true);
  const totalPages = Math.ceil(totalCount / 10);
  const startX = useRef(0);
  const moveX = useRef(0);

  const data = useSWR<TreeMessage>(
    `/donations/campaigns/${campaignId}/tree?page=${currentPage}`
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    moveX.current = e.touches[0].clientX - startX.current;
  };

  const handleTouchEnd = () => {
    if (moveX.current < -50 && currentPage < totalPages - 1 && totalPages > 1) {
      setShowDecorations(false);
      setIsFlipping((prev) => !prev);
      setTimeout(() => {
        setShowDecorations(true);
      }, 400);
      if (currentPage < totalPages - 1) {
        setCurrentPage((prev) => prev + 1);
      }
    } else if (moveX.current > 50 && currentPage > 0 && totalPages > 1) {
      setShowDecorations(false);
      setIsFlipping((prev) => !prev);
      setTimeout(() => {
        setShowDecorations(true);
      }, 400);
      if (currentPage !== 0) {
        setCurrentPage((prev) => prev - 1);
      }
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
        messages={data.data?.messages || []}
        isFlipping={isFlipping}
        showDecorations={showDecorations}
      />

      <div className={styles.pagination}>
        {new Array(Math.max(1, totalPages)).fill(0).map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              currentPage === index ? styles.activeDot : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}
