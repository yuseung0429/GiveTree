'use client';

import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Layout from '@/components/common/Layout';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState<string>('');

  const today = new Date().toISOString().split('T')[0];

  const sixMonthsLater = new Date();
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
  const maxDate = sixMonthsLater.toISOString().split('T')[0];

  const handleAmountChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\d,]/g, '');
    const numberOnly = sanitizedValue.replace(/,/g, '');

    const formattedValue = numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setTargetAmount(formattedValue);
  };

  return (
    <Layout>
      <header>
        <AppBar title="캠페인 신청" onBackClick={() => router.back()} />
      </header>
      <main style={{ backgroundColor: '#F5F5F5', padding: '1rem' }}>
        <Flex flexDirection="column" gap="1.5rem">
          <Flex
            flexDirection="column"
            gap="0.75rem"
            style={{ paddingTop: '1rem' }}
          >
            <Typography
              size={18}
              weight="medium"
              color={colorPalette.primary[500]}
            >
              캠페인 명
            </Typography>
            <TextField />
          </Flex>
          <Flex flexDirection="column" gap="0.75rem">
            <Typography
              size={18}
              weight="medium"
              color={colorPalette.primary[500]}
            >
              모금 기간
            </Typography>
            <Flex gap="0.5rem" alignItems="center">
              <TextField
                type="date"
                min={today}
                max={maxDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Typography>~</Typography>
              <TextField
                type="date"
                min={startDate || today}
                max={maxDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={!startDate}
              />
            </Flex>
          </Flex>
          <Flex flexDirection="column" gap="0.75rem">
            <Typography
              size={18}
              weight="medium"
              color={colorPalette.primary[500]}
            >
              목표 금액
            </Typography>
            <TextField
              value={targetAmount}
              onChange={handleAmountChange}
              placeholder="최소 100,000원 이상 설정해주세요."
            />
          </Flex>
          <Flex flexDirection="column" gap="0.75rem">
            <Typography
              size={18}
              weight="medium"
              color={colorPalette.primary[500]}
            >
              캠페인 설명
            </Typography>
            <TextField
              placeholder="후원자들이 캠페인을 잘 알 수 있도록 설명해주세요."
              multiline
              style={{ minHeight: '150px' }}
            />
          </Flex>

          <Flex flexDirection="column" gap="0.25rem">
            <Typography
              size={18}
              weight="medium"
              color={colorPalette.primary[500]}
            >
              대표사진 등록
            </Typography>
            <Typography color={colorPalette.grey[600]}>
              메인화면에 들어갈 대표사진을 등록해주세요.
            </Typography>
          </Flex>

          <Flex flexDirection="column" gap="0.25rem">
            <Typography
              size={18}
              weight="medium"
              color={colorPalette.primary[500]}
            >
              추가사진 등록
            </Typography>
            <Typography color={colorPalette.grey[600]}>
              상세페이지에 들어갈 사진을 등록해주세요.
            </Typography>
          </Flex>
        </Flex>
      </main>
      <footer style={{ padding: '10px', backgroundColor: '#F5F5F5' }}>
        <Button size="xl" fullWidth>
          신청하기
        </Button>
      </footer>
    </Layout>
  );
}
