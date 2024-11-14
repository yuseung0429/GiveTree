import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { accountInfoSchema } from './schema';

import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import FormField from '@/components/common/FormField';
import ImageUploader from '@/components/common/ImageUploader';
import TextField from '@/components/common/TextField';

interface AccountInfoFormProps {
  formData: FormData;
  onSubmit: (e: FormEvent) => void;
}

type AccountInfoFormValues = z.infer<typeof accountInfoSchema>;

const AccountInfoForm = ({
  formData,
  onSubmit: propOnSubmit,
}: AccountInfoFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AccountInfoFormValues>({
    resolver: zodResolver(accountInfoSchema),
    mode: 'onChange',
  });

  const onSubmit = (_: AccountInfoFormValues, event?: BaseSyntheticEvent) => {
    if (!event) {
      return;
    }

    propOnSubmit(event as FormEvent);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="1.5rem">
        <FormField label="이메일 주소" errorMessage={errors.email?.message}>
          <TextField
            {...register('email')}
            size="lg"
            color={errors.email ? 'danger' : 'primary'}
            variant={errors.email ? 'contained' : 'outlined'}
            placeholder="example@givetree.co.kr"
            defaultValue={formData.get('email') as string}
          />
        </FormField>

        <FormField label="비밀번호" errorMessage={errors.password?.message}>
          <TextField
            {...register('password')}
            type="password"
            size="lg"
            color={errors.password ? 'danger' : 'primary'}
            variant={errors.password ? 'contained' : 'outlined'}
            placeholder="(문자, 숫자 포함 6~20자)"
            defaultValue={formData.get('password') as string}
          />
        </FormField>

        <FormField
          label="비밀번호 확인"
          errorMessage={errors.confirm_password?.message}
        >
          <TextField
            {...register('confirm_password')}
            type="password"
            size="lg"
            color={errors.confirm_password ? 'danger' : 'primary'}
            variant={errors.confirm_password ? 'contained' : 'outlined'}
            defaultValue={formData.get('confirm_password') as string}
          />
        </FormField>

        <FormField label="재단 이름" errorMessage={errors.name?.message}>
          <TextField
            {...register('name')}
            size="lg"
            color={errors.name ? 'danger' : 'primary'}
            variant={errors.name ? 'contained' : 'outlined'}
            defaultValue={formData.get('name') as string}
          />
        </FormField>

        <FormField
          label="프로필 이미지"
          errorMessage={errors.profileImage?.message}
        >
          <ImageUploader
            maxFileCount={1}
            {...register('profileImage')}
            onUpload={(images) =>
              setValue('profileImage', images.length.toString())
            }
            defaultValue={
              formData.get('profileImage')
                ? [formData.get('profileImage')?.toString() || '']
                : []
            }
          />
        </FormField>

        <Button type="submit" size="lg" fullWidth>
          다음
        </Button>
      </Flex>
    </form>
  );
};

export default AccountInfoForm;
