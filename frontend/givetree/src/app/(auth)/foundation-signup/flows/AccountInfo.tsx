'use client';

import { FormEvent } from 'react';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import FormField from '@/components/common/FormField';
import ImageUploader from '@/components/common/ImageUploader';
import TextField from '@/components/common/TextField';
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
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="1.5rem">
            <FormField label="이메일 주소">
              <TextField
                name="email"
                size="lg"
                placeholder="example@givetree.co.kr"
                defaultValue={formData.get('email') as string}
              />
            </FormField>

            <FormField label="비밀번호">
              <TextField
                type="password"
                name="password"
                size="lg"
                placeholder="(문자, 숫자 포함 6~20자)"
                defaultValue={formData.get('password') as string}
              />
            </FormField>

            <FormField label="비밀번호 확인">
              <TextField
                type="password"
                name="password_check"
                size="lg"
                defaultValue={formData.get('password_check') as string}
              />
            </FormField>

            <FormField label="재단 이름">
              <TextField
                name="name"
                size="lg"
                defaultValue={formData.get('name') as string}
              />
            </FormField>

            <FormField label="프로필 이미지">
              <ImageUploader name="profileImageUrl" maxFileCount={1} />
            </FormField>

            <Button size="lg" fullWidth>
              다음
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AccountInfo;
