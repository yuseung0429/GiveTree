import Box from '@/components/common/Box';
import * as style from '../donation.css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

export default function Page() {
  return (
    <Box>
      <Box marginBottom="15px" backgroundColor="white" padding="20px 15px">
        <Typography
          as="h3"
          weight="medium"
          size={20}
          color={colorPalette.grey[600]}
          className={style.accountInfo}
        >
          결제 일
        </Typography>
        <Box padding="10px 5px">
          <Typography className={style.accountInfo} weight="semiBold" size={18}>
            매월 26일 (다음 결제일 : 11월 26일)
          </Typography>
          <Typography
            className={style.accountInfo}
            color={colorPalette.primary[400]}
            weight="medium"
          >
            정기결제 신청 즉시 이번 달 결제가 진행됩니다. <br />
            다음 달부터 매월 26일 휴일 없이 결제됩니다.
          </Typography>
          <Typography>
            결제실패(잔고부족, 분실카드 등)시 28일 추가 결제 됩니다.
          </Typography>
        </Box>
      </Box>

      <Box backgroundColor="white" padding="20px 15px">
        <Box
          backgroundColor={colorPalette.primary[50]}
          padding="20px"
          className={style.accountBox}
        >
          <Typography className={style.marginBottom5} weight="medium">
            지금 <span className={style.money}>20,000원</span> 결제되며
          </Typography>
          <Typography className={style.marginBottom20} weight="medium">
            다음 달부터 매월 26일 정기결제 됩니다.
          </Typography>
          <Typography className={style.marginBottom5} weight="medium">
            다음 결제일 : 11월 26일
          </Typography>
          <Typography weight="medium">결제 수단 : 하나은행 456 </Typography>
        </Box>
      </Box>
    </Box>
  );
}
