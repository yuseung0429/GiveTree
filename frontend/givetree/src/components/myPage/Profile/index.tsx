import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from './Profile.css';
import Button from '@/components/common/Button';

interface ProfileProps {
  role: string;
  name: string;
  totalDonation: number;
  currentMoney: number;
}

const Profile = ({ role, name, totalDonation, currentMoney }: ProfileProps) => {
  return (
    <>
      <div className={styles.name}>
        <Typography as="h5" color={colorPalette.primary[700]}>
          {role === 'user' ? 'GIVE 회원' : '재단 회원'}
        </Typography>

        <Typography as="h2" weight="semiBold">
          {name}
        </Typography>
      </div>

      <div className={styles.giveMoney}>
        <Typography as="h3" weight="medium">
          {role === 'user' ? '총 기부금액' : '현재 모금액'}
        </Typography>
        <Typography as="h3" weight="semiBold">
          {role === 'user'
            ? `${totalDonation.toLocaleString()}트리`
            : `${currentMoney.toLocaleString()}트리`}
        </Typography>
      </div>

      <div className={styles.footButton}>
        <Button variant="outlined" fullWidth>
          {role === 'user' ? '기부발자국 확인하기' : '후원 내역 확인하기'}
        </Button>
      </div>
    </>
  );
};

export default Profile;
