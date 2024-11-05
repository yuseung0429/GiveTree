'use client';

import { FormEvent } from 'react';

import Box from '@/components/common/Box';
import TextField from '@/components/common/TextField';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';

export default function SearchPage() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box padding="1rem">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" gap="0.75rem">
          <TextField name="query" placeholder="검색어" size="lg" />
          <Typography>거래 유형</Typography>
          <Typography>거래 상태</Typography>
          <Button size="lg">검색</Button>
        </Flex>
      </form>
    </Box>
  );
}
