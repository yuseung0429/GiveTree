'use client';

import { FormEvent } from 'react';

import Box from '@/components/common/Box';
import TextField from '@/components/common/TextField';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import colorPalette from '@/styles/tokens/colorPalette';
import Chip from '@/components/common/Chip';

export default function SearchPage() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box padding="1rem">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" gap="1rem">
          <TextField name="query" placeholder="검색어" size="lg" />

          <Flex flexDirection="column" gap="0.5rem">
            <Typography>거래 상태</Typography>
            <Box
              marginBottom="0.5rem"
              padding="1rem"
              borderRadius="0.5rem"
              backgroundColor={colorPalette.grey[200]}
            >
              <Flex gap="0.75rem" style={{ flexWrap: 'wrap' }}>
                <Checkbox defaultChecked>판매중</Checkbox>
                <Checkbox defaultChecked>예약중</Checkbox>
                <Checkbox defaultChecked>판매완료</Checkbox>
              </Flex>
            </Box>

            <Typography>거래 유형</Typography>
            <Box
              marginBottom="0.5rem"
              padding="1rem"
              borderRadius="0.5rem"
              backgroundColor={colorPalette.grey[200]}
            >
              <Flex gap="0.75rem" style={{ flexWrap: 'wrap' }}>
                <Checkbox defaultChecked>택배거래</Checkbox>
                <Checkbox defaultChecked>직거래</Checkbox>
              </Flex>
            </Box>

            <Typography>상품 상태</Typography>
            <Box
              padding="1rem"
              borderRadius="0.5rem"
              backgroundColor={colorPalette.grey[200]}
            >
              <Flex gap="0.75rem" style={{ flexWrap: 'wrap' }}>
                <Checkbox defaultChecked>미개봉</Checkbox>
                <Checkbox defaultChecked>거의 새 것</Checkbox>
                <Checkbox defaultChecked>사용감 있음</Checkbox>
              </Flex>
            </Box>
          </Flex>

          <Flex flexDirection="column" gap="0.5rem">
            <Typography>거래 상태</Typography>
            <Box marginBottom="0.5rem" padding="1rem">
              <Flex gap="0.75rem" style={{ flexWrap: 'wrap' }}>
                <Chip size="lg" variant="outlined">
                  판매중
                </Chip>
                <Chip size="lg" variant="outlined">
                  예약중
                </Chip>

                <Checkbox defaultChecked>판매중</Checkbox>
                <Checkbox defaultChecked>예약중</Checkbox>
                <Checkbox defaultChecked>판매완료</Checkbox>
              </Flex>
            </Box>
          </Flex>

          <Button size="lg">검색</Button>
        </Flex>
      </form>
    </Box>
  );
}
