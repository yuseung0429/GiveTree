import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import * as s from '../Donation.css';
import colorPalette from '@/styles/tokens/colorPalette';

import { CampaignDonation } from '@/types/donation/campaign/types';
import typography from '@/styles/tokens/typography';

interface GiveCampaignProps {
  donation: CampaignDonation;
}

export default function GiveCampaign({ donation }: GiveCampaignProps) {
  return (
    <Box className={s.box}>
      <Typography as="h3" weight="semiBold">
        {donation.campaignName}
      </Typography>
      <Typography>{donation.foundation}</Typography>
      <Typography
        as="h3"
        weight="semiBold"
        size={typography.size.lg}
        color={colorPalette.secondary[600]}
        style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
      >
        {donation.donationAmount.toLocaleString()}원
      </Typography>
      <Typography
        color={colorPalette.grey[800]}
        style={{ marginLeft: 'auto', marginRight: '0.25rem' }}
      >
        {donation.donationDate}
      </Typography>
    </Box>
  );
}
