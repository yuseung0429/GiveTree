import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';
import * as s from '@/components/myPage/Usage/Usage.css';
import { DonationDetailItem } from '@/api/donation/getDonationDetail';

export default function FoundationDonation({
  month,
  donationDetails,
}: {
  month: number;
  donationDetails: Array<DonationDetailItem[]> | [];
}) {
  const donationDetail = donationDetails[month - 1];

  return (
    <>
      {donationDetail.length !== 0 ? (
        donationDetail.map((detail, index) => (
          <div key={index} style={{ margin: '0 0.25rem 0.75rem' }}>
            <Box className={s.usageBox}>
              <Typography color={colorPalette.grey[800]} size={15}>
                {detail.createdAt.slice(0, 10)}
              </Typography>
              <Typography
                as="h3"
                weight="semiBold"
                style={{ marginTop: '0.25rem' }}
              >
                {detail.userName}
              </Typography>
              <Typography
                size={14}
                color={colorPalette.grey[800]}
                style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
              >
                {detail.createdAt.slice(11, 16)}
              </Typography>
              <Typography
                as="h3"
                weight="semiBold"
                size={typography.size.lg}
                color={colorPalette.secondary[600]}
                style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
              >
                {detail.amount.toLocaleString()}원
              </Typography>
            </Box>
          </div>
        ))
      ) : (
        <Box className={s.noneUsageBox}>
          <Typography as="h4">이달에 후원받은 내역이 없습니다.</Typography>
        </Box>
      )}
    </>
  );
}
