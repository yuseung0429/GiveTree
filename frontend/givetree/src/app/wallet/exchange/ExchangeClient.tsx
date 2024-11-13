'use client';

import Button from '@/components/common/Button';
import * as style from './exchange.css';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import TextField from '@/components/common/TextField';
import Account from '@/components/common/Account';
import { useState } from 'react';
import AmountSelect from '@/components/wallet/select';
import { RegisteredAccount } from '@/api/account/getRegisteredAccount';

interface ExchangeClientProps {
  initialAccount: RegisteredAccount | null;
}

export default function ExchangeClient({
  initialAccount,
}: ExchangeClientProps) {
  const [isAmountSelectOpen, setIsAmountSelectOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleAmountClick = () => {
    setIsAmountSelectOpen(true);
  };

  const handleAmountClose = () => {
    setIsAmountSelectOpen(false);
  };

  const handleAmountSelect = (amount: number, ids: number[]) => {
    setSelectedAmount(amount);
    setSelectedIds(ids);
    setIsAmountSelectOpen(false);
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
          color={colorPalette.primary[500]}
          className={style.alignCenter}
        >
          {selectedAmount.toLocaleString()}원
        </Typography>
        <Button
          size="sm"
          variant="outlined"
          style={{ width: '200px' }}
          onClick={handleAmountClick}
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
      <Account registeredAccount={initialAccount} />

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
          {selectedAmount.toLocaleString()} 원
        </Typography>
      </Flex>

      {/* 금액선택 모달 */}
      {isAmountSelectOpen && (
        <AmountSelect
          onClose={handleAmountClose}
          onSelect={handleAmountSelect}
          initialSelectedIds={selectedIds}
        />
      )}
    </Flex>
  );
}
