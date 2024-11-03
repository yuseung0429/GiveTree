'use client';

import { FormEvent } from 'react';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

interface FoundationIntroProps {
  onSubmit: () => void;
}

const FoundationIntro = ({ onSubmit }: FoundationIntroProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" gap="0.5rem">
        <Typography as="h2" weight="bold">
          재단 소개 입력
        </Typography>
        <Typography>재단에 대한 소개를 해주세요.</Typography>
      </Flex>
      <Box marginTop="1.5rem">
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="1rem">
            <TextField
              name="name"
              size="lg"
              placeholder="재단 소개"
              multiline
              height="10rem"
            />
            <Button type="submit" size="lg">
              다음
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default FoundationIntro;
