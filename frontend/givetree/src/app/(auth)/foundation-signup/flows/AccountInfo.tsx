'use client';

import { FormEvent, startTransition, useActionState, useEffect } from 'react';

import colorPalette from '@/styles/tokens/colorPalette';

import signupFoundation from '@/actions/auth/signupFoundation';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import ImageUploader from '@/components/common/ImageUploader';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

interface AccountInfoProps {
  onSubmit: () => void;
}

const AccountInfo = ({ onSubmit }: AccountInfoProps) => {
  const [state, action, isPending] = useActionState(signupFoundation, {});

  useEffect(() => {
    if (state.success) {
      onSubmit();
    }

    if (state.message) {
      alert(state.message);
    }
  }, [state, onSubmit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(() => action(new FormData(e.target as HTMLFormElement)));
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
            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                이메일 주소
              </Typography>
              <TextField
                name="email"
                size="lg"
                placeholder="example@givetree.co.kr"
              />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                비밀번호
              </Typography>
              <TextField
                type="password"
                name="password"
                size="lg"
                placeholder="(문자, 숫자 포함 6~20자)"
              />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                비밀번호 확인
              </Typography>
              <TextField type="password" name="password_check" size="lg" />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                재단 이름
              </Typography>
              <TextField name="name" size="lg" />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                프로필 이미지
              </Typography>
              <ImageUploader name="profileImageUrl" maxFileCount={1} />
            </Flex>
            <FormButton size="lg" pending={isPending} fullWidth>
              다음
            </FormButton>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AccountInfo;
