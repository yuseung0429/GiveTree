'use client';

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
  const [price, handlePriceChange] = useNumericInput();

  return (
    <Box padding="1rem">
      <Flex flexDirection="column" gap="0.75rem">
        <FormField label="제목">
          <TextField size="lg" placeholder="제목" />
        </FormField>

        <FormField label="내용">
          <TextField
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
                <CheckboxChip defaultChecked>택배거래</CheckboxChip>
                <CheckboxChip>직거래</CheckboxChip>
              </Flex>
            </FormField>

            <FormField label="거래 유형">
              <Flex gap="0.5rem">
                <CheckboxChip type="radio" name="status">
                  미개봉
                </CheckboxChip>
                <CheckboxChip type="radio" name="status">
                  거의 새 것
                </CheckboxChip>
                <CheckboxChip type="radio" name="status" defaultChecked>
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
            size="lg"
            placeholder="판매 가격"
            onChange={handlePriceChange}
          />
        </FormField>

        <FormField label="상품 사진">
          <ImageUploader maxFileCount={5} />
        </FormField>

        <FormField
          label="후원 정보"
          description="후원 금액과 후원할 재단을 선택해 주세요."
        >
          <DonationSelector price={price} />
        </FormField>

        <FormButton size="lg">글쓰기</FormButton>
      </Flex>
    </Box>
  );
}
