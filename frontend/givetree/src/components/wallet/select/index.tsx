'use client';

import Box from '@/components/common/Box';
import * as style from './select.css';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';
import { FaCheck } from 'react-icons/fa6';
import colorPalette from '@/styles/tokens/colorPalette';
import { useEffect, useState } from 'react';

interface AmountItem {
  id: number;
  amount: number;
  nickname: string;
}
interface AmountSelectProps {
  onClose: () => void;
  onSelect: (amount: number, selectedIds: number[]) => void;
  initialSelectedIds?: number[];
}

const formatKRW = (amount: number) => {
  return `${amount.toLocaleString()}원`;
};

// 임시데이터
const AMOUNT_LIST: AmountItem[] = [
  { id: 1, amount: 30000, nickname: '지원잉' },
  { id: 2, amount: 12000, nickname: '민지' },
  { id: 3, amount: 30000, nickname: '익명' },
  { id: 4, amount: 45777, nickname: '익명' },
  { id: 5, amount: 222234, nickname: '구음' },
  { id: 6, amount: 12000, nickname: '맑음' },
  { id: 7, amount: 30000, nickname: '햇살' },
  { id: 8, amount: 2345, nickname: '다람쥐' },
  { id: 9, amount: 89440, nickname: '소연이' },
  { id: 10, amount: 12000, nickname: '다운이' },
  { id: 11, amount: 22330, nickname: '김부각씨' },
  { id: 12, amount: 11100, nickname: '감자칩' },
];

export default function AmountSelect({
  onClose,
  onSelect,
  initialSelectedIds,
}: AmountSelectProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set(initialSelectedIds)
  );
  const [isAllSelected, setIsAllSelected] = useState(false);

  // 뒤로가기 처리
  useEffect(() => {
    const handlePopState = () => {
      onClose();
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose]);

  // 배경 클릭시 닫기
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleItemClick = (id: number) => {
    if (isAllSelected) {
      setIsAllSelected(false);
      setSelectedIds(new Set([id]));
    } else {
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    }
  };

  const handleAllClick = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
      setIsAllSelected(false);
    } else {
      setSelectedIds(new Set(AMOUNT_LIST.map((item) => item.id)));
      setIsAllSelected(true);
    }
  };

  const handleApply = () => {
    const totalAmount = Array.from(selectedIds).reduce((sum, id) => {
      const item = AMOUNT_LIST.find((item) => item.id === id);
      return sum + (item?.amount || 0);
    }, 0);
    onSelect(totalAmount, Array.from(selectedIds));
    onClose();
  };

  return (
    <Box
      className={`${style.container} ${style.fadeIn}`}
      onClick={handleBackgroundClick}
    >
      <Flex
        flexDirection="column"
        className={style.fixedContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <Box className={style.topLine} />

        {/* 금액선택 */}
        <Flex flexDirection="column" gap={18} className={style.selectbox}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            style={{ cursor: 'pointer' }}
            onClick={handleAllClick}
          >
            <Typography
              weight="medium"
              size={18}
              color={
                isAllSelected
                  ? colorPalette.primary[700]
                  : colorPalette.grey[600]
              }
            >
              전체 선택
            </Typography>
            <FaCheck
              size={18}
              color={
                isAllSelected
                  ? colorPalette.primary[700]
                  : colorPalette.grey[300]
              }
            />
          </Flex>

          {/* 금액아이템 */}
          <Flex flexDirection="column" justifyContent="space-between" gap={16}>
            {AMOUNT_LIST.map((item) => (
              <Flex
                key={item.id}
                justifyContent="space-between"
                alignItems="center"
                className={style.itemContainer}
                onClick={() => handleItemClick(item.id)}
              >
                <Typography
                  weight="medium"
                  size={18}
                  color={
                    !isAllSelected && selectedIds.has(item.id)
                      ? colorPalette.primary[700]
                      : colorPalette.grey[600]
                  }
                >
                  {formatKRW(item.amount)} [{item.nickname}]
                </Typography>
                {!isAllSelected && (
                  <FaCheck
                    size={18}
                    color={
                      selectedIds.has(item.id)
                        ? colorPalette.primary[700]
                        : colorPalette.grey[300]
                    }
                  />
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Button
          size="lg"
          className={style.btn}
          onClick={handleApply}
          disabled={!(selectedIds.size > 0 || isAllSelected)}
        >
          적용하기
        </Button>
      </Flex>
    </Box>
  );
}
