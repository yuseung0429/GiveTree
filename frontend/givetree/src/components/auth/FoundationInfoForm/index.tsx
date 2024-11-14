import {
  BaseSyntheticEvent,
  startTransition,
  useActionState,
  useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import signupFoundation from '@/actions/auth/signupFoundation';

import { foundationtInfoSchema } from '@/components/auth/FoundationInfoForm/schema';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import FormField from '@/components/common/FormField';
import ImageUploader from '@/components/common/ImageUploader';
import TextField from '@/components/common/TextField';
import useDialog from '@/hooks/useDialog';

type FoundationInfoFormValues = z.infer<typeof foundationtInfoSchema>;

interface FoundationInfoFormProps {
  formData: FormData;
  onSubmit: () => void;
}

const FoundationInfoForm = ({
  formData,
  onSubmit: propOnSubmit,
}: FoundationInfoFormProps) => {
  const { alert } = useDialog();
  const [state, action, isPending] = useActionState(signupFoundation, {});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FoundationInfoFormValues>({
    resolver: zodResolver(foundationtInfoSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (state.success) {
      propOnSubmit();
    }

    if (state.message) {
      alert(state.message);
    }
  }, [alert, state, propOnSubmit]);

  const onSubmit = (
    _: FoundationInfoFormValues,
    event?: BaseSyntheticEvent
  ) => {
    if (!event) {
      return;
    }

    event.preventDefault();

    const signupFormData = new FormData(event.target as HTMLFormElement);

    formData?.forEach((value, key) => {
      signupFormData.set(key, value);
    });

    startTransition(() => action(signupFormData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="1.5rem">
        <FormField
          label="사업자 등록번호"
          errorMessage={errors.corporateRegistrationNumber?.message}
        >
          <TextField
            {...register('corporateRegistrationNumber')}
            type="tel"
            size="lg"
            color={errors.corporateRegistrationNumber ? 'danger' : 'primary'}
            placeholder="000-00-00000"
            defaultValue={formData.get('corporateRegistrationNumber') as string}
          />
        </FormField>

        <FormField label="전화번호" errorMessage={errors.phoneNumber?.message}>
          <TextField
            {...register('phoneNumber')}
            type="tel"
            size="lg"
            color={errors.phoneNumber ? 'danger' : 'primary'}
            placeholder="010-0000-000"
            defaultValue={formData.get('phoneNumber') as string}
          />
        </FormField>

        <FormField label="주소" errorMessage={errors.address?.message}>
          <TextField
            {...register('address')}
            size="lg"
            color={errors.address ? 'danger' : 'primary'}
            defaultValue={formData.get('address') as string}
          />
        </FormField>

        <FormField
          label="재단 소개"
          errorMessage={errors.introduction?.message}
        >
          <TextField
            {...register('introduction')}
            size="lg"
            color={errors.introduction ? 'danger' : 'primary'}
            placeholder="최대 1000자까지 작성 가능합니다."
            height="10rem"
            multiline
            defaultValue={formData.get('introduction') as string}
          />
        </FormField>

        <FormField
          label="대표 이미지"
          errorMessage={errors.titleImageUrl?.message}
        >
          <ImageUploader
            {...register('titleImageUrl')}
            maxFileCount={1}
            defaultValue={
              formData.get('titleImageUrl')
                ? [formData.get('titleImageUrl')?.toString() || '']
                : []
            }
            onUpload={(images) =>
              setValue('titleImageUrl', images.length.toString())
            }
          />
        </FormField>

        <FormField
          label="기타 이미지"
          description="재단을 소개할 수 있는 이미지가 있으면 추가해 주세요."
          errorMessage={errors.imageUrls?.message}
        >
          <ImageUploader
            {...register('imageUrls')}
            maxFileCount={5}
            defaultValue={
              formData.get('imageUrls')
                ? [formData.get('imageUrls')?.toString() || '']
                : []
            }
            onUpload={(images) =>
              setValue('imageUrls', images.length.toString())
            }
          />
        </FormField>

        <FormField
          label="카테고리"
          description="쉼표(,)로 구분하여 여러 개의 카테고리를 등록할 수 있습니다."
          errorMessage={errors.categories?.message}
        >
          <TextField
            {...register('categories')}
            color={errors.categories ? 'danger' : 'primary'}
            size="lg"
            defaultValue={formData.get('categories') as string}
          />
        </FormField>

        <FormButton size="lg" pending={isPending} fullWidth>
          재단 계정 만들기
        </FormButton>
      </Flex>
    </form>
  );
};

export default FoundationInfoForm;
