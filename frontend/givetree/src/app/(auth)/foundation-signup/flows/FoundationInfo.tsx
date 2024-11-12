'use client';

import { FormEvent, startTransition, useActionState, useEffect } from 'react';

import useDialog from '@/hooks/useDialog';

import signupFoundation from '@/actions/auth/signupFoundation';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import FormField from '@/components/common/FormField';
import ImageUploader from '@/components/common/ImageUploader';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

interface FoundationInfoProps {
  formData: FormData;
  onBackClick: () => void;
  onSubmit: () => void;
}

const FoundationInfo = ({
  formData,
  onBackClick,
  onSubmit,
}: FoundationInfoProps) => {
  const { alert } = useDialog();

  const [state, action, isPending] = useActionState(signupFoundation, {});

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

    const signupFormData = new FormData(e.target as HTMLFormElement);

    formData?.forEach((value, key) => {
      signupFormData.set(key, value);
    });

    startTransition(() => action(signupFormData));
  };
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" justifyContent="space-between" gap="0.5rem">
        <Flex flexDirection="column" gap="0.5rem">
          <Typography as="h2" weight="semiBold">
            재단 정보
          </Typography>
          <Typography>재단에 관한 정보를 입력해 주세요.</Typography>
        </Flex>
        <div>
          <Button
            size="sm"
            variant="outlined"
            color="secondary"
            onClick={onBackClick}
          >
            이전 단계로
          </Button>
        </div>
      </Flex>

      <Box marginTop="1.5rem">
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap="1.5rem">
            <FormField label="사업자 등록번호">
              <TextField
                type="tel"
                name="corporateRegistrationNumber"
                size="lg"
                placeholder="000-00-00000"
              />
            </FormField>

            <FormField label="전화번호">
              <TextField
                type="tel"
                name="phoneNumber"
                size="lg"
                placeholder="010-0000-000"
              />
            </FormField>

            <FormField label="주소">
              <TextField name="address" size="lg" />
            </FormField>

            <FormField label="재단 소개">
              <TextField
                name="introduction"
                size="lg"
                placeholder="최대 1000자까지 작성 가능합니다."
                height="10rem"
                multiline
              />
            </FormField>

            <FormField label="대표 이미지">
              <ImageUploader name="titleImageUrl" maxFileCount={1} />
            </FormField>

            <FormField
              label="기타 이미지"
              description="재단을 소개할 수 있는 이미지가 있으면 추가해 주세요."
            >
              <ImageUploader name="imageUrls" maxFileCount={5} />
            </FormField>

            <FormField
              label="카테고리"
              description="쉼표(,)로 구분하여 여러 개의 카테고리를 등록할 수 있습니다."
            >
              <TextField name="categories" size="lg" />
            </FormField>

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
