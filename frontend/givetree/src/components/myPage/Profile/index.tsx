import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from './Profile.css';
import Button from '@/components/common/Button';

interface ProfileProps {
  type: string;
  name: string;
  totalDonation: number;
}

const Profile = ({ type, name, totalDonation }: ProfileProps) => {
  return (
    <>
      <div className={styles.name}>
        <Typography as="h5" color={colorPalette.primary[500]}>
          {type === '개인' ? 'GIVE 회원' : '재단 회원'}
        </Typography>

        <Typography as="h2" weight="semiBold">
          {name}
        </Typography>
      </div>

      <div className={styles.giveMoney}>
        <Typography as="h3" weight="medium">
          {type === '개인' ? '총 기부금액' : '현재 모금액'}
        </Typography>
        <Typography as="h3" weight="semiBold">
          {totalDonation}트리
        </Typography>
      </div>

      <div className={styles.footButton}>
        <Button variant="outlined" fullWidth>
          {type === '개인' ? '기부발자국 확인하기' : '후원 내역 확인하기'}
        </Button>
      </div>
    </>
  );
};

export default Profile;
