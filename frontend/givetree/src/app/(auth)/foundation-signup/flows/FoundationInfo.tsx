'use client';

import { FormEvent, startTransition, useActionState, useEffect } from 'react';

import useDialog from '@/hooks/useDialog';
import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import createFoundation from '@/actions/auth/createFoundation';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import ImageUploader from '@/components/common/ImageUploader';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

interface FoundationInfoProps {
  onSubmit: () => void;
}

const FoundationInfo = ({ onSubmit }: FoundationInfoProps) => {
  const { alert } = useDialog();

  const [state, action, isPending] = useActionState(createFoundation, {});

  useEffect(() => {
    if (state.success) {
      onSubmit();
    }

    if (state.message) {
      alert(state.message);
    }
  }, [alert, state, onSubmit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(() => action(new FormData(e.target as HTMLFormElement)));
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
          <Flex flexDirection="column" gap="1.5rem">
            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                사업자 등록번호
              </Typography>
              <TextField
                type="tel"
                name="corporateRegistrationNumber"
                size="lg"
                placeholder="000-00-00000"
              />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                전화번호
              </Typography>
              <TextField
                type="tel"
                name="phoneNumber"
                size="lg"
                placeholder="010-0000-000"
              />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                주소
              </Typography>
              <TextField name="address" size="lg" />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                재단 소개
              </Typography>
              <TextField
                name="introduction"
                size="lg"
                placeholder="최대 1000자까지 작성 가능합니다."
                height="10rem"
                multiline
              />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                대표 이미지
              </Typography>
              <ImageUploader name="titleImageUrl" maxFileCount={1} />
            </Flex>

            <Flex flexDirection="column" gap="0.5rem">
              <Typography color={colorPalette.primary[600]} weight="semiBold">
                기타 이미지
              </Typography>
              <Typography size={typography.size.sm}>
                재단을 소개할 수 있는 이미지가 있으면 추가해 주세요.
              </Typography>
              <ImageUploader name="imageUrls" maxFileCount={5} />
            </Flex>

            <FormButton size="lg" pending={isPending} fullWidth>
              재단 계정 만들기
            </FormButton>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default FoundationInfo;
