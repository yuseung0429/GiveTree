'use client';

import { FormEvent } from 'react';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

interface AccountInfoProps {
  onSubmit: () => void;
}

const AccountInfo = ({ onSubmit }: AccountInfoProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" gap="0.5rem">
        <Typography as="h2" weight="bold">
          계정 정보
        </Typography>
        <Typography>로그인에 필요한 정보를 입력해 주세요.</Typography>
      </Flex>
      <Box marginTop="1.5rem">
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="1rem">
            <TextField name="email" size="lg" placeholder="이메일 주소" />
            <TextField
              type="password"
              name="password"
              size="lg"
              placeholder="비밀번호"
            />
            <TextField
              type="password"
              name="password_check"
              size="lg"
              placeholder="비밀번호 확인"
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

export default AccountInfo;
