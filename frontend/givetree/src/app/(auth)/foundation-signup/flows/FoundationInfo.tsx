'use client';

import { FormEvent } from 'react';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

interface FoundationInfoProps {
  onSubmit: () => void;
}

const FoundationInfo = ({ onSubmit }: FoundationInfoProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" gap="0.5rem">
        <Typography as="h2" weight="bold">
          재단 정보
        </Typography>
        <Typography>재단에 관한 정보를 입력해 주세요.</Typography>
      </Flex>
      <Box marginTop="1.5rem">
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="1rem">
            <TextField name="name" size="lg" placeholder="재단명" />
            <TextField
              type="tel"
              name="biz"
              size="lg"
              placeholder="사업자 등록번호"
            />
            <TextField type="tel" name="tel" size="lg" placeholder="전화번호" />
            <TextField name="biz" size="lg" placeholder="주소" />
            <Button type="submit" size="lg">
              다음
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default FoundationInfo;
