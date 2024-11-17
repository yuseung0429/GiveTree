'use client';

import exchangeCampaignToken from '@/actions/token/exchangeCampaignToken';
import { RegisteredAccount } from '@/api/account/getRegisteredAccount';
import Account from '@/components/common/Account';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import ConfirmPassword from '@/components/common/PasswordConfirm';
import Typography from '@/components/common/Typography';
import CampaignAmountSelect from '@/components/wallet/select/CampaignAmountSelect';
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
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleAmountSelect = (amount: number, ids: number[]) => {
    selectedIdsRef.current = ids;
    setSelectedAmount(amount);
  };

  const handleAmountClick = () => {
    push({
      children: (
        <CampaignAmountSelect
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
    const response = await exchangeCampaignToken(
      selectedIdsRef.current,
      password
    );
    setIsPending(false);

    if (response.result) {
      await alert('환전을 완료했습니다.');
      router.back();
    } else {
      await alert(response.error);
    }
  };

  const handleSubmit = () => {
    if (selectedIdsRef.current.length === 0) {
      alert('출금할 금액을 설정해 주세요.');
      return;
    }

    push({ children: <ConfirmPassword popAction={handlePasswordInput} /> });
  };

  return (
    <Flex flexDirection="column" height="100%">
      <Box padding="1rem" style={{ flex: '1 1 auto', overflow: 'scroll' }}>
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
    </Flex>
  );
}
