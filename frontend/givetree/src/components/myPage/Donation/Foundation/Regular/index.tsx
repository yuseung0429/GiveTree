import Box from '@/components/common/Box';
import * as s from '../../Donation.css';
import Image from 'next/image';
import { FoundationRegularDonation } from '@/types/donation/foundation/types';
import Typography from '@/components/common/Typography';
import { HiChevronRight } from 'react-icons/hi2';
import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

interface RegularGiveProps {
  donation: FoundationRegularDonation;
}

export default function RegularGive({ donation }: RegularGiveProps) {
  const calculateMonth = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if (currentDate > 26) {
      if (currentMonth + 1 > 12) {
        return 1;
      } else {
        return currentMonth + 1;
      }
    } else {
      return currentMonth;
    }
  };

  return (
    <Box className={s.box}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className={s.title}>
          <Image
            src={donation.image}
            alt="foundation image"
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
          />
          <Typography as="h3" weight="semiBold">
            {donation.foundationName}
          </Typography>
        </div>
        <HiChevronRight size={22} />
      </div>

      <Typography
        as="h3"
        weight="semiBold"
        size={typography.size.lg}
        color={colorPalette.secondary[600]}
        style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
      >
        월 {donation.amount.toLocaleString()}원
      </Typography>

      <Typography
        as="h3"
        weight="medium"
        size={typography.size.md}
        color={colorPalette.text[900]}
        style={{ marginLeft: 'auto', marginRight: '0.25rem' }}
      >
        매월 26일 (다음 결제일: {calculateMonth()}월 26일)
      </Typography>
    </Box>
  );
}
