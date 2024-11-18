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
      <Typography color={colorPalette.grey[800]} size={15}>
        {donation.createdAt.slice(0, 10)}
      </Typography>
      <div className={s.title}>
        <Image
          src={donation.foundationImage}
          alt="foundation image"
          width={40}
          height={40}
          style={{
            borderRadius: '50%',
            border: `1px solid ${colorPalette.grey[500]}`,
          }}
        />
        <div>
          <Typography as="h3" weight="semiBold">
            {donation.foundationName}
          </Typography>
          <Typography
            size={14}
            color={colorPalette.grey[800]}
            style={{ marginTop: '2px' }}
          >
            {donation.createdAt.slice(11, 16)}
          </Typography>
        </div>
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
    </Box>
  );
}
