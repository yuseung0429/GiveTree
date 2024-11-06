'use client';

import { FormEvent } from 'react';

import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import CheckboxChip from '@/components/common/CheckboxChip';
import Flex from '@/components/common/Flex';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

export default function SearchPage() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box padding="1rem">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" gap="1.25rem">
          <TextField name="query" placeholder="검색어" size="lg" />

          <Flex flexDirection="column" gap="0.5rem">
            <Typography size={typography.size.sm} weight="medium">
              거래 상태
            </Typography>
            <Flex gap="0.5rem" style={{ flexWrap: 'wrap' }}>
              <CheckboxChip>판매중</CheckboxChip>
              <CheckboxChip>예약중</CheckboxChip>
              <CheckboxChip>판매완료</CheckboxChip>
            </Flex>
          </Flex>

          <Flex flexDirection="column" gap="0.5rem">
            <Typography size={typography.size.sm} weight="medium">
              거래 유형
            </Typography>
            <Flex gap="0.5em" style={{ flexWrap: 'wrap' }}>
              <CheckboxChip>택배거래</CheckboxChip>
              <CheckboxChip>직거래</CheckboxChip>
            </Flex>
          </Flex>

          <Flex flexDirection="column" gap="0.5rem">
            <Typography size={typography.size.sm} weight="medium">
              상품 상태
            </Typography>
            <Flex gap="0.5rem" style={{ flexWrap: 'wrap' }}>
              <CheckboxChip>미개봉</CheckboxChip>
              <CheckboxChip>거의 새 것</CheckboxChip>
              <CheckboxChip>사용감 있음</CheckboxChip>
            </Flex>
          </Flex>

          <Flex flexDirection="column" gap="0.5rem">
            <Typography size={typography.size.sm} weight="medium">
              거래 상태
            </Typography>
            <Flex gap="0.5rem" style={{ flexWrap: 'wrap' }}>
              <CheckboxChip>판매중</CheckboxChip>
              <CheckboxChip>예약중</CheckboxChip>
              <CheckboxChip>판매완료</CheckboxChip>
            </Flex>
          </Flex>

          <Flex gap="0.5rem" justifyContent="flex-end">
            <Button type="reset" variant="outlined" color="secondary" size="sm">
              초기화
            </Button>
            <Button variant="outlined" size="sm">
              모두 선택
            </Button>
          </Flex>

          <Button type="submit" size="lg">
            검색
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
