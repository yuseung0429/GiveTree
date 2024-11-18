'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import * as style from './Donation.css';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import DonationCash from '@/components/campaign/Donation/DonationCash';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import Image from 'next/image';
import ConfirmPassword from '@/components/common/PasswordConfirm';
import useModal from '@/hooks/useModal';
import useDialog from '@/hooks/useDialog';
import { useRouter } from 'next/navigation';
import donateCampaign from '@/actions/campaign/donateCampaign';
import { AccountInfo } from '@/components/common/Account';

export default function Donation({
  id,
  name,
  image,
  isAccount,
  role,
}: {
  id: string;
  name: string;
  image: string;
  isAccount: AccountInfo | null;
  role: string;
}) {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const { push, pop } = useModal();
  const { alert } = useDialog();
  const router = useRouter();

  const [state, action, isPending] = useActionState(donateCampaign, {});

  useEffect(() => {
    if (state.success) {
      (async () => {
        await alert('캠페인 후원이 완료되었습니다.');
        router.push(`/campaign/${id}`);
      })();
    }

    if (state.message) {
      alert(state.message);
    }
  }, [alert, state, router, id]);

  // 캠페인 후원 액션 호출하는 함수
  const handleSubmit = (password: string) => {
    const donateCampaignFormData = new FormData();
    donateCampaignFormData.append('campaignId', id);
    donateCampaignFormData.append('simplePassword', password);
    donateCampaignFormData.append('amount', amount.toString());
    donateCampaignFormData.append('message', message);

    startTransition(() => action(donateCampaignFormData));
  };

  // 후원하기 버튼 눌렀을 때 -> 비밀번호 입력 창
  const handlePasswordOpen = () => {
    if (!isAccount) {
      alert('간편계좌를 먼저 등록해주세요.');
    } else if (amount === 0) {
      alert('후원금액을 입력해주세요.');
    } else if (!message) {
      alert('캠페인 메세지를 작성해주세요.');
    } else {
      push({
        children: (
          <ConfirmPassword
            popAction={(password: string) => {
              pop();
              handleSubmit(password);
            }}
          />
        ),
      });
    }
  };

  // 금액을 직접 입력하는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value.replace(/[^0-9]/g, ''), 10);
    setAmount(value || 0);
  };

  // 버튼 클릭으로 금액을 추가하는 함수
  const handleButtonClick = (increment: number) => {
    setAmount((prevAmount) => prevAmount + increment);
  };
  return (
    <Box as="article" className={style.cashbox}>
      {/* 후원단체  */}
      <Box
        as="section"
        marginBottom="15px"
        backgroundColor="white"
        padding="1.5rem 1rem"
      >
        <Flex gap="10px" alignItems="center">
          <Image
            src={image}
            alt="campaign image"
            width={65}
            height={65}
            style={{ borderRadius: '50%' }}
          />
          <Flex flexDirection="column" gap="3px">
            <Typography
              weight="semiBold"
              size={20}
              color={colorPalette.primary[600]}
            >
              {name}
            </Typography>
            <Typography
              size={18}
              color={colorPalette.grey[600]}
              style={{ marginTop: '2px' }}
            >
              일시후원하기
            </Typography>
          </Flex>
        </Flex>

        {/* 금액입력 */}

        <Box className={style.inputBox}>
          <input
            type="text"
            value={amount > 0 ? amount.toLocaleString() : ''}
            onChange={handleInputChange}
            className={style.amountInput}
            placeholder="후원하실 금액을 입력해주세요"
          />
        </Box>

        {/* 금액 버튼 */}
        <Flex gap="15px">
          {[
            { label: '5천', value: 5000 },
            { label: '1만', value: 10000 },
            { label: '5만', value: 50000 },
            { label: '10만', value: 100000 },
          ].map((button) => (
            <button
              key={button.value}
              onClick={() => handleButtonClick(button.value)}
              className={style.amountButton}
            >
              + {button.label}
            </button>
          ))}
        </Flex>
        <DonationCash amount={amount} />
      </Box>

      {/* 메세지 입력 */}
      <Box
        as="section"
        marginBottom="15px"
        backgroundColor="white"
        padding="1.5rem 1.25rem"
      >
        <Typography
          as="h3"
          weight="medium"
          style={{ marginBottom: '0.75rem', marginLeft: '0.25rem' }}
        >
          캠페인 메세지
        </Typography>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="캠페인 트리에 보낼 응원 메세지를 작성해주세요."
          multiline
          style={{ minHeight: '100px' }}
        />
      </Box>

      {/* 후원하기 버튼 */}
      {role === 'USER' && (
        <div className={style.giveButton}>
          <Button size='lg' onClick={handlePasswordOpen} fullWidth disabled={isPending}>
            후원하기
          </Button>
        </div>
      )}
    </Box>
  );
}
