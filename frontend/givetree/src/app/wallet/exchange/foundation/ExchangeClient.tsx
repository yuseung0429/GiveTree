'use client';

import exchangeFoundationToken from '@/actions/token/exchangeFoundationToken';
import { RegisteredAccount } from '@/api/account/getRegisteredAccount';
import Account from '@/components/common/Account';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import ConfirmPassword from '@/components/common/PasswordConfirm';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import AmountSelect from '@/components/wallet/select';
import useDialog from '@/hooks/useDialog';
import useModal from '@/hooks/useModal';
import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import * as style from '../exchange.css';

interface ExchangeClientProps {
  initialAccount: RegisteredAccount | null;
}

export default function ExchangeClient({
  initialAccount,
}: ExchangeClientProps) {
  const router = useRouter();
  const { alert } = useDialog();
  const { push } = useModal();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const selectedIdsRef = useRef<number[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleAmountSelect = (amount: number, ids: number[]) => {
    selectedIdsRef.current = ids;
    setSelectedAmount(amount);
  };

  const handleAmountClick = () => {
    push({
      children: (
        <AmountSelect
          onSelect={handleAmountSelect}
          initialSelectedIds={selectedIdsRef.current}
        />
      ),
      animation: 'bottom',
    });
  };

  const handlePasswordInput = async (password: string) => {
    router.back();

    setIsPending(true);
    await exchangeFoundationToken(
      selectedIdsRef.current,
      password,
      messageRef.current?.value || ''
    );
    setIsPending(false);

    await alert('환전을 완료했습니다.');

    router.back();
  };

  const handleSubmit = () => {
    if (selectedIdsRef.current.length === 0) {
      alert('출금할 금액을 설정해 주세요.');
      return;
    }

    if (!messageRef.current?.value) {
      alert('출금 목적을 작성해 주세요.');
      return;
    }

    push({ children: <ConfirmPassword popAction={handlePasswordInput} /> });
  };

  return (
    <>
      <Box padding="1rem">
        <Flex flexDirection="column" gap="2rem">
          {/* 출금 금액 설정 */}
          <Flex flexDirection="column" gap="1.5rem" alignItems="center">
            <Typography
              as="h3"
              size={typography.size.lg}
              weight="semiBold"
              color={colorPalette.grey[800]}
              className={style.alignCenter}
            >
              출금할 금액을 설정해 주세요.
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
              variant="outlined"
              style={{ width: '200px' }}
              onClick={handleAmountClick}
            >
              금액 선택
            </Button>
          </Flex>
          {/* 출금목적 */}
          <Flex flexDirection="column" gap="0.75rem">
            <Typography
              as="h4"
              size={18}
              weight="medium"
              color={colorPalette.grey[900]}
            >
              출금 목적
            </Typography>
            <Box
              padding="0.75rem"
              borderRadius="0.5rem"
              backgroundColor={colorPalette.grey[200]}
            >
              <Typography
                color={colorPalette.grey[800]}
                style={{ marginBottom: '0.5rem', lineHeight: '1.5' }}
              >
                출금 목적은 GIVE 후원자들에게 공개됩니다.
                <br />
                정확한 사용 내역을 작성해 주세요.
              </Typography>
              <TextField placeholder="예. 영양제 구입 100개" ref={messageRef} />
            </Box>
          </Flex>

          {/* 출금계좌 */}
          <Account registeredAccount={initialAccount} />
        </Flex>
      </Box>
      {/* 계좌 입금액 */}
      <Flex flexDirection="column" gap="1rem" className={style.bottom}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          className={style.moneybox}
        >
          <Typography
            size={typography.size.lg}
            weight="semiBold"
            color={colorPalette.grey[900]}
          >
            계좌 입금액
          </Typography>
          <Typography
            size={typography.size.lg}
            weight="bold"
            color={colorPalette.primary[700]}
          >
            {selectedAmount.toLocaleString()} 원
          </Typography>
        </Flex>
        <FormButton
          size="xl"
          fullWidth
          pending={isPending}
          onClick={handleSubmit}
        >
          출금 신청
        </FormButton>
      </Flex>
    </>
  );
}
