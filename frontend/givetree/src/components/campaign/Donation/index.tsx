'use client';

import { useState } from 'react';
import * as style from './Donation.css';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import DonationCash from '@/components/campaign/Donation/DonationCash';

export default function Donation({ name }: { name: string }) {
  const [amount, setAmount] = useState<number>(0);

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
      <Flex gap="10px" alignItems="center">
        <div className={style.foundationLogo}></div>
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
  );
}
