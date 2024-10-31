"use client"

import Flex from '@/components/common/Flex';
import * as style from './DonationCash.css'
import Box from "@/components/common/Box";
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { useState } from 'react';

export default function DonationCash () {
  const [amount, setAmount] = useState('');

  // 금액을 직접 입력하는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value.replace(/[^0-9]/g, ''), 10);
    setAmount(value || 0);
  };

  // 버튼 클릭으로 금액을 추가하는 함수
  const handleButtonClick = (increment: number) => {
    setAmount(prevAmount => prevAmount + increment);
  };

  return (
    <Box as="article" className={style.cashbox}>
      {/* 후원단체  */}
      <Flex gap='10px' alignItems='center'>
        <div className={style.foundationLogo}></div>
        <Flex flexDirection='column' gap='3px'>
          <Typography weight='medium' color={colorPalette.primary[600]}>사회복지법인 굿네이버스</Typography>
          <Typography color={colorPalette.grey[600]}>일시후원하기</Typography>
        </Flex>
      </Flex>

      {/* 금액입력 */}
      <Box marginTop='20px'>
        <input 
            type="text" 
            value={amount.toLocaleString()} // 3자리마다 콤마 추가
            onChange={handleInputChange} 
            className={style.amountInput}
            placeholder="후원하실 금액을 입력해주세요"
          />
      </Box>

      {/* 금액 버튼 */}
      <Flex gap='10px' justifyContent='spaceBetween'>
        {[{ label: '5천', value: 5000 }, { label: '1만', value: 10000 }, { label: '5만', value: 50000 }, { label: '10만', value: 100000 }].map((button) => (
            <button 
              key={button.value} 
              onClick={() => handleButtonClick(button.value)} 
              className={style.amountButton}
            >
              + {button.label}
            </button>
          ))}
      </Flex>

    </Box>
  );
}