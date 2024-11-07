'use client';

import Button from '@/components/common/Button';
import * as style from './exchange.css';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import TextField from '@/components/common/TextField';
import Account from '@/components/common/Account';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Page() {
  const [amount, setAmount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExchangeContent
        amount={amount}
        setAmount={setAmount}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </Suspense>
  );
}

function ExchangeContent({
  amount,
  setAmount,
  selectedIds,
  setSelectedIds,
}: {
  amount: number;
  setAmount: (amount: number) => void;
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFromSearchParams = useCallback(() => {
    if (!pathname.includes('/select')) {
      const amountParam = searchParams.get('amount');
      const selectedIdsParam = searchParams.get('selectedIds');

      if (amountParam) {
        setAmount(Number(amountParam));
      }
      if (selectedIdsParam) {
        setSelectedIds(selectedIdsParam.split(',').map(Number));
      }

      // 파라미터 처리 후 URL 정리
      router.replace('/wallet/exchange');
    }
  }, [pathname, router, searchParams, setAmount, setSelectedIds]);

  useEffect(() => {
    updateFromSearchParams();
  }, [updateFromSearchParams]);

  const handleSelectClick = () => {
    // 현재 선택된 ID들도 함께 전달
    router.push(`/wallet/exchange/select?selectedIds=${selectedIds.join(',')}`);
  };
  return (
    <Flex flexDirection="column" gap={40} className={style.padding20}>
      {/* 출금 금액 설정 */}
      <Flex flexDirection="column" gap={20} alignItems="center">
        <Typography
          as="h3"
          size={20}
          weight="semiBold"
          color={colorPalette.grey[900]}
          className={style.alignCenter}
        >
          출금할 금액을 설정해주세요
        </Typography>

        <Typography
          size={28}
          weight="semiBold"
          color={
            amount > 0 ? colorPalette.primary[700] : colorPalette.grey[500]
          }
          className={style.alignCenter}
        >
          {amount.toLocaleString()}원
        </Typography>
        <Button
          size="sm"
          variant="outlined"
          style={{ width: '200px' }}
          onClick={handleSelectClick}
        >
          금액 선택
        </Button>
      </Flex>

      {/* 출금목적 */}
      <Flex flexDirection="column" gap={10}>
        <Typography
          as="h4"
          size={18}
          weight="medium"
          color={colorPalette.grey[900]}
          style={{ marginBottom: '5px' }}
        >
          출금 목적
        </Typography>
        <Typography
          color={colorPalette.grey[800]}
          style={{ lineHeight: '24px' }}
        >
          출금 목적은 GIVE 후원자들에게 공개됩니다.
          <br />
          정확한 사용내역을 작성해주세요.
        </Typography>
        <TextField placeholder="예. 영양제 구입 100개" />
      </Flex>

      {/* 출금계좌 */}
      <Account />

      {/* 계좌 입금액 */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        className={style.moneybox}
      >
        <Typography size={18} weight="semiBold" color={colorPalette.grey[900]}>
          계좌 입금액
        </Typography>
        <Typography size={18} weight="bold" color={colorPalette.primary[700]}>
          {amount.toLocaleString()}원
        </Typography>
      </Flex>
    </Flex>
  );
}
