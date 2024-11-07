import * as styles from '@/components/myPage/Profile/Profile.css';
import * as s from './Information.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Image, { StaticImageData } from 'next/image';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

interface FoundationInfoProps {
  image: StaticImageData;
  name: string;
  corporateRegistrationNumber: string;
  phoneNumber: string;
  address: string;
}

export default function FoundationInfo({
  image,
  name,
  corporateRegistrationNumber,
  phoneNumber,
  address,
}: FoundationInfoProps) {
  return (
    <>
      <div className={s.changeImage}>
        <HiOutlinePlusCircle size={28} />
      </div>
      <Box className={s.profileConatainer}>
        <Image
          src={image}
          alt="profile Image"
          width={130}
          height={130}
          className={styles.profileImg}
        />
        <div className={s.name}>
          <Typography as="h5" color={colorPalette.primary[700]}>
            재단 회원
          </Typography>
          <Typography as="h2" weight="semiBold">
            {name}
          </Typography>
        </div>

        <div className={s.info}>
          <Typography as="h3" weight="medium">
            사업자 등록번호
          </Typography>
          <Typography as="h4" weight="medium">
            {corporateRegistrationNumber}
          </Typography>
        </div>

        <div className={s.info}>
          <Typography as="h3" weight="medium">
            전화번호
          </Typography>
          <Typography as="h4" weight="medium">
            {phoneNumber}
          </Typography>
        </div>
        <div className={s.info}>
          <Typography as="h3" weight="medium">
            주소
          </Typography>
          <Typography as="h4" weight="medium">
            {address}
          </Typography>
        </div>
      </Box>
    </>
  );
}
