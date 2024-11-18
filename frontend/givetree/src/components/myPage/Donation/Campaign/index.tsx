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
      <Typography color={colorPalette.grey[800]} size={15}>
        {donation.createdAt.slice(0, 10)}
      </Typography>
      <Typography as="h3" weight="semiBold" style={{ marginTop: '0.25rem' }}>
        {donation.campaignName}
      </Typography>
      <Typography size={15} style={{ marginTop: '2px' }}>
        {donation.foundationName}
      </Typography>
      <Typography
        size={14}
        color={colorPalette.grey[800]}
        style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
      >
        {donation.createdAt.slice(11, 16)}
      </Typography>
      <Typography
        as="h3"
        weight="semiBold"
        size={typography.size.lg}
        color={colorPalette.secondary[600]}
        style={{ marginLeft: 'auto', marginRight: '0.5rem', marginTop: '2px' }}
      >
        {donation.amount.toLocaleString()}원
      </Typography>
    </Box>
  );
}
