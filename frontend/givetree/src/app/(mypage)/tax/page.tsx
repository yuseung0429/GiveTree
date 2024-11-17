import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';
import TaxCredit from '@/components/myPage/TaxCredit';
import getTotalDonation from '@/api/donation/getTotalDonation';

//검색 시작 날짜, 종료 날짜 구하는 함수
function getYearStartAndEndDates(): { startDate: string; endDate: string } {
  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear}-01-01`;
  const endDate = `${currentYear}-12-31`;
  return { startDate, endDate };
}

export default async function TaxPage() {
  const { startDate, endDate } = getYearStartAndEndDates();
  const totalDonation = await getTotalDonation({
    'start-date': startDate,
    'end-date': endDate,
  });

  return (
    <Box
      padding="1rem"
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      <Typography
        as="h3"
        size={typography.size.xl}
        weight="semiBold"
        color={colorPalette.secondary[500]}
      >
        기부금 세액공제 한도는? <br></br>
        어디에 기부했는지에 따라 달라요!
      </Typography>

      <Typography
        as="h3"
        size={typography.size.lg}
        weight="semiBold"
        color={colorPalette.text[800]}
        style={{ marginTop: '0.5rem' }}
      >
        지정기부금단체
      </Typography>

      <Typography>
        법정기부단체 외 기부금 영수증을 발행할 수 있는 단체. 대부분의
        민간모금조직, 비영리단체 등
      </Typography>

      <div
        style={{
          border: '1px solid grey',
          borderRadius: '8px',
          marginTop: '0.25rem',
        }}
      >
        <Typography
          weight="medium"
          style={{ margin: '0.5rem auto', textAlign: 'center' }}
          color={colorPalette.text[900]}
        >
          지정기부금단체 세액공제 대상금액 한도는<br></br>
          기부자{' '}
          <b>
            <u>소득금액의 30%</u>
          </b>{' '}
          내의 기부금
        </Typography>
      </div>

      <Typography
        as="h3"
        size={typography.size.xl}
        weight="semiBold"
        color={colorPalette.secondary[500]}
        style={{ marginTop: '0.75rem' }}
      >
        지정기부금단체 기부금 세액공제 혜택은<br></br>
        10년 동안 이월할 수 있어요!
      </Typography>

      <Typography>
        올해 한도를 넘겨서 세액공제를 받지 못한 기부금은<br></br>
        10년까지 이월해서 다 환급 받을 수 있습니다.
      </Typography>

      <div
        style={{
          border: '1px solid grey',
          borderRadius: '8px',
          marginTop: '0.25rem',
        }}
      >
        <Typography
          weight="semiBold"
          color={colorPalette.text[900]}
          style={{ margin: '0.5rem auto 0', textAlign: 'center' }}
        >
          지정기부금(종교단체 제외) 세액공제 환급금 계산식
        </Typography>
        <Typography
          weight="medium"
          style={{ margin: '0.25rem auto 0.5rem', textAlign: 'center' }}
          color={colorPalette.text[800]}
        >
          (연 기부금 총액 중 1천만원 이하 * <b>15%</b>)<br></br>+ (연 기부금
          총액 중 1천만원 초과분 * 30%)
        </Typography>
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <TaxCredit totalDonation={totalDonation} />
      </div>
    </Box>
  );
}
