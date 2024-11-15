'use client';

import createCampaign from '@/actions/campaign/createCampaign';
import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import ImageUploader from '@/components/common/ImageUploader';
import Layout from '@/components/common/Layout';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import useDialog from '@/hooks/useDialog';
import colorPalette from '@/styles/tokens/colorPalette';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  startTransition,
  use,
  useActionState,
  useEffect,
  useState,
} from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const foundationId = parseInt(unwrappedParams.id, 10);

  const { alert } = useDialog();
  const router = useRouter();

  const [state, action, isPending] = useActionState(createCampaign, {});

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [targetFundraisingAmount, setTargetFundraisingAmount] =
    useState<string>('');

  useEffect(() => {
    if (state.success) {
      (async () => {
        await alert('캠페인 신청이 완료되었습니다.');
        router.push(`/campaign/${state.location!.split('/')[2]}` || '/');
      })();
    }

    if (state.message) {
      alert(state.message);
    }
  }, [alert, state, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const signupFormData = new FormData(e.target as HTMLFormElement);

    startTransition(() => action(signupFormData));
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
    setTargetFundraisingAmount(formattedValue);
  };

  return (
    <Layout>
      <header>
        <AppBar title="캠페인 신청" onBackClick={() => router.back()} />
      </header>
      <main style={{ backgroundColor: '#F5F5F5', padding: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="foundationId" value={foundationId} />
          <Flex
            flexDirection="column"
            gap="1.5rem"
            style={{ marginBottom: '50px' }}
          >
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
              <TextField name="name" />
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
                  name="startDate"
                  min={today}
                  max={maxDate}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Typography>~</Typography>
                <TextField
                  type="date"
                  name="endDate"
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
                name="targetFundraisingAmount"
                value={targetFundraisingAmount}
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
                name="introduction"
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
                  style={{
                    color: colorPalette.primary[500],
                    fontWeight: '600',
                  }}
                >
                  1장
                </span>
                을 등록해주세요.
              </Typography>
              <ImageUploader maxFileCount={1} name="titleImageUrl" />
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
                  style={{
                    color: colorPalette.primary[500],
                    fontWeight: '600',
                  }}
                >
                  최대 5장
                </span>
                까지 등록해주세요.
              </Typography>
              <ImageUploader name="imageUrls" />
            </Flex>
          </Flex>
          <Flex
            style={{
              position: 'fixed',
              bottom: '0',
              left: '0',
              width: '100%',
              padding: '0.75rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button size="xl" fullWidth disabled={isPending}>
              신청하기
            </Button>
          </Flex>
        </form>
      </main>
      <footer style={{ padding: '10px', backgroundColor: '#F5F5F5' }}></footer>
    </Layout>
  );
}
