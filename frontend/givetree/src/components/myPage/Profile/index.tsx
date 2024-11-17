import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from './Profile.css';
import Button from '@/components/common/Button';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface ProfileProps {
  role: string;
  name: string;
  image: StaticImageData | string;
  totalDonation: number;
  currentMoney: number;
}

const Profile = ({
  role,
  name,
  image,
  totalDonation,
  currentMoney,
}: ProfileProps) => {
  return (
    <>
      <Image
        src={image}
        alt="profile Image"
        width={130}
        height={130}
        className={styles.profileImg}
      />
      <div className={styles.name}>
        <Typography as="h5" color={colorPalette.primary[700]}>
          {role === 'USER' ? 'GIVE 회원' : '재단 회원'}
        </Typography>

        <Typography as="h2" weight="semiBold">
          {name}
        </Typography>
      </div>

      <div className={styles.giveMoney}>
        <Typography as="h3" weight="medium">
          {role === 'USER' ? '총 기부금액' : '현재 모금액'}
        </Typography>
        <Typography as="h3" weight="semiBold">
          {role === 'USER'
            ? `${totalDonation.toLocaleString()} 트리`
            : `${currentMoney.toLocaleString()} 트리`}
        </Typography>
      </div>

      <Link
        className={styles.footButton}
        href={role === 'USER' ? '/givefoot' : '/myfoundation/donation'}
      >
        <Button variant="outlined" fullWidth>
          {role === 'USER' ? '기부발자국 확인하기' : '후원 내역 확인하기'}
        </Button>
      </Link>
    </>
  );
};

export default Profile;
