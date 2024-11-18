'use client';

import useGetCampaignTokens from '@/api/token/useGetCampaignTokens';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import * as style from './select.css';

interface AmountSelectProps {
  onSelect: (amount: number, selectedIds: number[]) => void;
  initialSelectedIds: number[];
}

export default function CampaignAmountSelect({
  onSelect,
  initialSelectedIds,
}: AmountSelectProps) {
  const data = useGetCampaignTokens();

  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set(initialSelectedIds)
  );
  const [isAllSelected, setIsAllSelected] = useState(false);

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
      setSelectedIds(new Set(data?.content.map((item) => item.id)));
      setIsAllSelected(true);
    }
  };

  const handleApply = () => {
    const totalAmount = Array.from(selectedIds).reduce((sum, id) => {
      const item = data?.content.find((item) => item.id === id);
      return sum + (item?.amount || 0);
    }, 0);
    onSelect(totalAmount, Array.from(selectedIds));
    history.back();
  };

  return (
    <div className={style.container}>
      <Flex
        flexDirection="column"
        gap="0.5rem"
        height="100%"
        style={{ overflow: 'scroll' }}
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
            {data?.content.map((item) => (
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
                  {`${item.amount.toLocaleString()}원`} [{item.name}]
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
          size="xl"
          fullWidth
          onClick={handleApply}
          disabled={!(selectedIds.size > 0 || isAllSelected)}
        >
          적용하기
        </Button>
      </Flex>
    </div>
  );
}
