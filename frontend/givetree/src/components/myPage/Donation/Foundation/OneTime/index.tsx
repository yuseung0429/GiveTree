import * as s from '../../Donation.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import { FoundationOneTimeDonation } from '@/types/donation/foundation/types';
import Image from 'next/image';
import typography from '@/styles/tokens/typography';
import colorPalette from '@/styles/tokens/colorPalette';

interface OneTimeGiveProps {
  donation: FoundationOneTimeDonation;
}

export default function OneTimeGive({ donation }: OneTimeGiveProps) {
  return (
    <Box className={s.box}>
      <div className={s.title}>
        <Image
          src={donation.foundationImage}
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
        {donation.amount.toLocaleString()}원
      </Typography>

      <Typography
        color={colorPalette.grey[800]}
        style={{ marginLeft: 'auto', marginRight: '0.25rem' }}
      >
        {donation.createdAt.slice(0, 10)}
      </Typography>
    </Box>
  );
}
