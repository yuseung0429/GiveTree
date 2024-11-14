'use client';

import { FormEvent } from 'react';

import AccountInfoForm from '@/components/auth/AccountInfoForm';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

interface AccountInfoProps {
  formData: FormData;
  onSubmit: (formData: FormData) => void;
}

const AccountInfo = ({ formData, onSubmit }: AccountInfoProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(new FormData(e.target as HTMLFormElement));
  };

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" gap="0.5rem">
        <Typography as="h2" weight="bold">
          계정 정보
        </Typography>
        <Typography>계정에 대한 정보를 입력해 주세요.</Typography>
      </Flex>
      <Box marginTop="1.5rem">
        <AccountInfoForm formData={formData} onSubmit={handleSubmit} />
      </Box>
    </Flex>
  );
};

export default AccountInfo;
