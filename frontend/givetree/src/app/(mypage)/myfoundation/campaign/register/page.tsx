'use client';

import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import ImageUploader from '@/components/common/ImageUploader';
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

  const handleImageUpload = (url: string[]) => {
    /**
     * 이 콜백은 이미지가 업로드 될 때마다 호출됨.
     * (3개의 이미지를 한번에 업로드하면 3번 호출됨)
     * 업로드한 이미지의 주소들의 배열 형태로 주어짐
     * example:
     * ['https://s3.amazonaws.com/1.png', 'https://s3.amazonaws.com/2.png']
     */
    console.log(url);
    /**
     * 여기서 받은 url을 ref로 저장했다가 api 호출할 때 같이 주면 됨
     */
  };

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
            <Typography
              size={14}
              color={colorPalette.grey[600]}
              weight="medium"
              style={{ marginBottom: '0.75rem' }}
            >
              메인화면에 들어갈 대표사진{' '}
              <span
                style={{ color: colorPalette.primary[500], fontWeight: '600' }}
              >
                1장
              </span>
              을 등록해주세요.
            </Typography>
            <ImageUploader onUpload={handleImageUpload} maxFileCount={1} />
          </Flex>

          <Flex flexDirection="column" gap="0.25rem">
            <Typography
              size={18}
              weight="medium"
              color={colorPalette.primary[500]}
            >
              추가사진 등록
            </Typography>
            <Typography
              size={14}
              color={colorPalette.grey[600]}
              weight="medium"
              style={{ marginBottom: '0.75rem' }}
            >
              상세페이지에 들어갈 사진을{' '}
              <span
                style={{ color: colorPalette.primary[500], fontWeight: '600' }}
              >
                최대 5장
              </span>
              까지 등록해주세요.
            </Typography>
            <ImageUploader onUpload={handleImageUpload} />
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
