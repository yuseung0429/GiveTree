import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';
import * as s from '@/components/myPage/Usage/Usage.css';
import { CampaignDonationItem } from '@/api/donation/getCampaignDonation';

export default function CampaignDonation({
  currentIndex,
  campaignDonation,
}: {
  currentIndex: number;
  campaignDonation: Array<CampaignDonationItem[] | []>;
}) {
  const donationDetail = campaignDonation[currentIndex];

  return (
    <>
      {donationDetail.length !== 0 ? (
        donationDetail.map((donation) => {
          <Box className={s.usageBox}>
            <Typography color={colorPalette.grey[800]}>
              {donation.createdAt.slice(0, 10)}
            </Typography>
            <Typography as="h3" weight="semiBold">
              {donation.userName}
            </Typography>
            <Typography
              as="h3"
              weight="semiBold"
              size={typography.size.lg}
              color={colorPalette.secondary[600]}
              style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
            >
              {donation.amount.toLocaleString()}원
            </Typography>
          </Box>;
        })
      ) : (
        <Box className={s.noneUsageBox}>
          <Typography as="h4">캠페인 후원받은 내역이 없습니다.</Typography>
        </Box>
      )}
    </>
  );
}
