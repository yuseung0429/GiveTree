'use client';

import React, { useState } from 'react';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import typography from '@/styles/tokens/typography';
import * as s from './TaxCredit.css';
import colorPalette from '@/styles/tokens/colorPalette';

interface TaxCreditProps {
  totalDonation: number;
}

export default function TaxCredit({ totalDonation }: TaxCreditProps) {
  const [incomeText, setIncomeText] = useState<string>('');
  const [income, setIncome] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    const formattedIncome = onlyNums ? Number(onlyNums).toLocaleString() : '';
    setIncomeText(formattedIncome);
    setIncome(Number(onlyNums));
  };

  const calcTaxCredit = (income: number) => {
    const limit = income * 0.3;
    if (totalDonation > limit) {
      if (limit > 10000000) {
        return 1500000 + (limit - 10000000) * 0.3;
      } else {
        return limit * 0.15;
      }
    } else {
      return totalDonation * 0.15;
    }
  };

  const onCalculate = () => {
    setIsOpen(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCalculate();
    }
  };

  const reCalculate = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIncomeText('');
    }, 500);
  };

  return (
    <Box padding="0.75rem" className={s.clacBox}>
      <Typography
        as="h3"
        size={typography.size.lg}
        weight="semiBold"
        color={colorPalette.text[800]}
        style={{ margin: '0 auto' }}
      >
        올해 세액공제 환급금 계산해보기
      </Typography>
      <Typography
        weight="medium"
        style={{ marginLeft: 'auto', marginTop: '0.75rem' }}
      >
        나의 기부금 : <b>{totalDonation.toLocaleString()}원</b>
      </Typography>

      <Typography style={{ marginTop: '0.5rem' }} weight="medium">
        과제 대상 연소득<br></br>
        (연소득액에서 각종 공제를 제외한 소득액)
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.5rem',
        }}
      >
        <input
          type="text"
          style={{ textAlign: 'end' }}
          value={incomeText}
          onChange={handleIncomeChange}
          onKeyDown={onKeyDown}
          className={s.moneyInput}
          placeholder="원"
        />
        <Button size="sm" onClick={onCalculate}>
          계산하기
        </Button>
      </div>

      <div className={`${s.openBox} ${isOpen ? s.openContent : ''}`}>
        <Typography style={{ marginTop: '1rem' }} weight="semiBold">
          올해 세액공제 환급금
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.5rem',
          }}
        >
          <div style={{ textAlign: 'end' }} className={s.moneyInput}>
            {calcTaxCredit(income).toLocaleString()}원
          </div>
          <Button size="sm" onClick={reCalculate}>
            다시하기
          </Button>
        </div>
      </div>
    </Box>
  );
}
