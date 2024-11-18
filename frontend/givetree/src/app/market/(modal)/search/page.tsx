'use client';

import { FormEvent } from 'react';

import { useRouter } from 'next/navigation';

import type { SaleSearchParameter } from '@/types/market/market';

import convertParams from '@/utils/convertParams';

import typography from '@/styles/tokens/typography';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import CheckboxChip from '@/components/common/CheckboxChip';
import Flex from '@/components/common/Flex';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

export default function SearchPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params: SaleSearchParameter = {};
    const formData = new FormData(e.target as HTMLFormElement);

    params.query = formData.get('query') as string;
    params.statuses = formData.getAll('statuses') as string[];
    params.isDirectSale = formData.get('isDirectSale') === 'true';
    params.isDeliverySale = formData.get('isDeliverySale') === 'true';
    params.productionConditions = formData.getAll(
      'productionConditions'
    ) as string[];

    for (const param in params) {
      const key = param as keyof SaleSearchParameter;
      if (
        !params[key] ||
        (Array.isArray(params[key]) && params[key].length === 0)
      ) {
        delete params[key];
      }
    }

    router.back();

    const handlePopState = () => {
      router.push(
        `/market${convertParams(
          params as Record<string, string | string[] | boolean>
        )}`
      );
      window.removeEventListener('popstate', handlePopState);
    };

    window.addEventListener('popstate', handlePopState);
  };

  return (
    <Box padding="1rem">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" gap="1.25rem">
          <TextField name="query" placeholder="검색어" size="lg" />

          <Flex flexDirection="column" gap="0.5rem">
            <Typography size={typography.size.sm} weight="medium">
              거래 상태
            </Typography>
            <Flex gap="0.5rem" style={{ flexWrap: 'wrap' }}>
              <CheckboxChip name="statuses" value="판매중">
                판매중
              </CheckboxChip>
              <CheckboxChip name="statuses" value="예약중">
                예약중
              </CheckboxChip>
              <CheckboxChip name="statuses" value="판매완료">
                판매완료
              </CheckboxChip>
            </Flex>
          </Flex>

          <Flex flexDirection="column" gap="0.5rem">
            <Typography size={typography.size.sm} weight="medium">
              거래 유형
            </Typography>
            <Flex gap="0.5em" style={{ flexWrap: 'wrap' }}>
              <CheckboxChip name="isDirectSale" value="true">
                직거래
              </CheckboxChip>
              <CheckboxChip name="isDeliverySale" value="true">
                택배거래
              </CheckboxChip>
            </Flex>
          </Flex>

          <Flex flexDirection="column" gap="0.5rem">
            <Typography size={typography.size.sm} weight="medium">
              상품 상태
            </Typography>
            <Flex gap="0.5rem" style={{ flexWrap: 'wrap' }}>
              <CheckboxChip name="productionConditions" value="미개봉">
                미개봉
              </CheckboxChip>
              <CheckboxChip name="productionConditions" value="거의 새 것">
                거의 새 것
              </CheckboxChip>
              <CheckboxChip name="productionConditions" value="사용감 있음">
                사용감 있음
              </CheckboxChip>
            </Flex>
          </Flex>

          <Flex gap="0.5rem" justifyContent="flex-end">
            <Button type="reset" variant="outlined" color="secondary" size="sm">
              초기화
            </Button>
          </Flex>

          <Button type="submit" size="lg">
            검색
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
