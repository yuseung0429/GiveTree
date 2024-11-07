'use client';

import Box from '@/components/common/Box';
import * as style from './select.css';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';
import { FaCheck } from 'react-icons/fa6';
import colorPalette from '@/styles/tokens/colorPalette';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SelectePage() {
  return (
    <Suspense>
      <SelectePageContent />
    </Suspense>
  );
}

interface AmountItem {
  id: number;
  amount: number;
  nickname: string;
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

function SelectePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 현재 선택된 금액 가져오기
  const selectedIdsParam = searchParams.get('selectedIds');

  // 초기 선택 상태 설정
  useEffect(() => {
    if (selectedIdsParam) {
      const ids = selectedIdsParam.split(',').map(Number);
      setSelectedItems(new Set(ids));
    }
  }, [selectedIdsParam]);

  const totalAmount = useMemo(() => {
    if (isAllSelected) {
      return AMOUNT_LIST.reduce((sum, item) => sum + item.amount, 0);
    }
    return Array.from(selectedItems).reduce((sum, id) => {
      const item = AMOUNT_LIST.find((item) => item.id === id);
      return sum + (item?.amount || 0);
    }, 0);
  }, [selectedItems, isAllSelected]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      router.back();
    }, 300);
  }, [router]);

  const handleApply = () => {
    setIsClosing(true);
    const totalAmount = Array.from(selectedItems).reduce((sum, id) => {
      const item = AMOUNT_LIST.find((item) => item.id === id);
      return sum + (item?.amount || 0);
    }, 0);

    router.replace(
      `/wallet/exchange?amount=${totalAmount}&selectedIds=${Array.from(
        selectedItems
      ).join(',')}`
    );

    setTimeout(() => {
      router.back();
    }, 300);
  };

  // 안드로이드 뒤로가기 감지
  useEffect(() => {
    const handlePopState = () => {
      closeModal();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [closeModal]);

  // 배경 클릭 시 모달 닫기
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleItemClick = (id: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    setIsAllSelected(false);
  };

  const handleAllClick = () => {
    setIsAllSelected((prev) => !prev);
    setSelectedItems(new Set());
  };

  return (
    <Box
      className={`${style.container} ${style.fadeIn}`}
      onClick={handleBackgroundClick}
    >
      <Flex
        flexDirection="column"
        className={`${style.fixedContainer} ${
          isClosing ? style.slideDown : style.slideUp
        }`}
      >
        <Box className={style.topLine} />

        {/* 금액선택 */}
        <Flex flexDirection="column" gap={18} className={style.selectbox}>
          {/* 금액아이템 (디폴트) */}
          <Flex
            justifyContent="space-between"
            alignItems="center"
            onClick={handleAllClick}
            style={{ cursor: 'pointer' }}
          >
            <Typography
              weight={isAllSelected ? 'semiBold' : 'medium'}
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
          <Flex flexDirection="column" justifyContent="space-between" gap={15}>
            {AMOUNT_LIST.map((item) => (
              <Flex
                key={item.id}
                justifyContent="space-between"
                alignItems="center"
                onClick={() => handleItemClick(item.id)}
                className={style.itemContainer}
              >
                <Typography
                  weight={isAllSelected ? 'semiBold' : 'medium'}
                  size={18}
                  color={
                    selectedItems.has(item.id)
                      ? colorPalette.primary[700]
                      : colorPalette.grey[600]
                  }
                >
                  {formatKRW(item.amount)} [{item.nickname}]
                </Typography>
                <FaCheck
                  size={18}
                  color={
                    selectedItems.has(item.id)
                      ? colorPalette.primary[700]
                      : colorPalette.grey[300]
                  }
                />
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Button className={style.btn} onClick={handleApply}>
          {formatKRW(totalAmount)} 적용하기
        </Button>
      </Flex>
    </Box>
  );
}
