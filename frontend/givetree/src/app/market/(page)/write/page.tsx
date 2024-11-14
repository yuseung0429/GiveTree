'use client';

import {
  FormEvent,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import useDialog from '@/hooks/useDialog';

import writeMarketPost from '@/actions/market/writeMarketPost';

import useNumericInput from '@/hooks/useNumericInput';

import Box from '@/components/common/Box';
import CheckboxChip from '@/components/common/CheckboxChip';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import FormField from '@/components/common/FormField';
import ImageUploader from '@/components/common/ImageUploader';
import TextField from '@/components/common/TextField';
import DonationSelector from '@/components/market/DonationSelector';

export default function WritePage() {
  const router = useRouter();

  const { alert } = useDialog();

  const [price, handlePriceChange] = useNumericInput();

  const [contribution, setContribution] = useState<number>(0);
  const [foundationId, setFoundationId] = useState<number>(0);

  const [state, action, isPending] = useActionState(writeMarketPost, {});

  useEffect(() => {
    if (state.success) {
      (async () => {
        await alert('판매 게시글이 등록되었습니다.');
        router.push('/market');
      })();
    }

    if (state.message) {
      alert(state.message);
    }
  }, [alert, state, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const signupFormData = new FormData(e.target as HTMLFormElement);

    startTransition(() => action(signupFormData));
  };

  const handleDonationChange = useCallback(
    (contribution: number, foundationId: number) => {
      setContribution(contribution);
      setFoundationId(foundationId);
    },
    []
  );

  return (
    <Box padding="1rem">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" gap="0.75rem">
          <FormField label="제목">
            <TextField name="title" size="lg" placeholder="제목" />
          </FormField>

          <FormField label="내용">
            <TextField
              name="description"
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
          >
            <TextField
              name="price"
              size="lg"
              placeholder="판매 가격"
              onChange={handlePriceChange}
            />
          </FormField>

          <FormField label="상품 사진">
            <ImageUploader name="imageUrls" maxFileCount={5} />
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
    </Box>
  );
}
