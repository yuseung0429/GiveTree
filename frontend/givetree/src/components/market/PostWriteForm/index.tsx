import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useDialog from '@/hooks/useDialog';
import useNumericInput from '@/hooks/useNumericInput';

import { postWriteSchema } from './schema';

import Box from '@/components/common/Box';
import CheckboxChip from '@/components/common/CheckboxChip';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import FormField from '@/components/common/FormField';
import ImageUploader from '@/components/common/ImageUploader';
import TextField from '@/components/common/TextField';
import DonationSelector from '@/components/market/DonationSelector';

type PostWriteFormValues = z.infer<typeof postWriteSchema>;

interface PostWriteFormProps {
  isPending: boolean;
  onSubmit: (formData: FormData) => void;
}

const PostWriteForm = ({
  isPending,
  onSubmit: propOnSubmit,
}: PostWriteFormProps) => {
  const { alert } = useDialog();

  const [price, handlePriceChange] = useNumericInput();

  const [contribution, setContribution] = useState<number>(0);
  const [foundationId, setFoundationId] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostWriteFormValues>({
    resolver: zodResolver(postWriteSchema),
    mode: 'onChange',
  });

  const handleDonationChange = useCallback(
    (contribution: number, foundationId: number) => {
      setContribution(contribution);
      setFoundationId(foundationId);
    },
    []
  );

  const onSubmit = (_: PostWriteFormValues, event?: BaseSyntheticEvent) => {
    if (!event) {
      return;
    }

    event.preventDefault();

    const postWriteData = new FormData(event.target as HTMLFormElement);

    if (foundationId === 0) {
      alert('기부할 재단을 선택해 주세요.');
      return;
    }

    if (contribution < 1) {
      alert('기부할 금액을 입력해 주세요.');
      return;
    }

    if (contribution > Number(postWriteData.get('price')?.toString())) {
      alert('기부 금액이 판매 가격보다 많습니다.');
      return;
    }

    propOnSubmit(postWriteData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="0.75rem">
        <FormField label="제목" errorMessage={errors.title?.message}>
          <TextField {...register('title')} size="lg" placeholder="제목" />
        </FormField>

        <FormField label="내용" errorMessage={errors.description?.message}>
          <TextField
            {...register('description')}
            size="lg"
            placeholder="최대 1000자 이내로 작성해 주세요."
            height="10rem"
            multiline
          />
        </FormField>

        <Box padding="1rem 0">
          <Flex flexDirection="column" gap="1rem">
            <FormField label="거래 유형">
              <Flex gap="0.5rem">
                <CheckboxChip name="isDeliverySale" defaultChecked>
                  택배거래
                </CheckboxChip>
                <CheckboxChip name="isDirectSale">직거래</CheckboxChip>
              </Flex>
            </FormField>

            <FormField label="거래 유형">
              <Flex gap="0.5rem">
                <CheckboxChip
                  type="radio"
                  name="productionCondition"
                  value="미개봉"
                >
                  미개봉
                </CheckboxChip>
                <CheckboxChip
                  type="radio"
                  name="productionCondition"
                  value="거의 새 것"
                >
                  거의 새 것
                </CheckboxChip>
                <CheckboxChip
                  type="radio"
                  name="productionCondition"
                  value="사용감 있음"
                  defaultChecked
                >
                  사용감 있음
                </CheckboxChip>
              </Flex>
            </FormField>
          </Flex>
        </Box>

        <FormField
          label="판매 가격"
          description="구매자에게 물품을 판매할 가격을 입력해 주세요."
          errorMessage={errors.price?.message}
        >
          <TextField
            {...register('price', { onChange: handlePriceChange })}
            size="lg"
            placeholder="판매 가격"
          />
        </FormField>

        <FormField label="상품 사진" errorMessage={errors.imageUrls?.message}>
          <ImageUploader
            {...register('imageUrls')}
            maxFileCount={5}
            onUpload={(images) =>
              setValue('imageUrls', images.length.toString())
            }
          />
        </FormField>

        <FormField
          label="기부 정보"
          description="기부 금액과 기부할 재단을 선택해 주세요."
        >
          <DonationSelector price={price} onChange={handleDonationChange} />
        </FormField>

        <input type="hidden" name="contribution" value={contribution} />
        <input type="hidden" name="foundationId" value={foundationId} />

        <FormButton type="submit" size="lg" pending={isPending}>
          글쓰기
        </FormButton>
      </Flex>
    </form>
  );
};

export default PostWriteForm;
