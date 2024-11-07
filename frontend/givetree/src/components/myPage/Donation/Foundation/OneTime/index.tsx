import * as s from '../../Donation.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import { OneTimeDonations } from '@/types/donation/foundation/types';
import Image from 'next/image';
import FoundationImg from '@/assets/images/foundation.png';
import typography from '@/styles/tokens/typography';
import colorPalette from '@/styles/tokens/colorPalette';

interface OneTimeGiveProps {
  donation: OneTimeDonations;
}

export default function OneTimeGive({ donation }: OneTimeGiveProps) {
  return (
    <Box className={s.box}>
      <div className={s.title}>
        <Image
          src={FoundationImg}
          alt="foundation image"
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
        />
        <Typography as="h3" weight="semiBold">
          {donation.foundationName}
        </Typography>
      </div>

      <Typography
        as="h3"
        weight="semiBold"
        size={typography.size.lg}
        color={colorPalette.secondary[600]}
        style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
      >
        {donation.oneTimeDonationAmount.toLocaleString()}원
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
