import Image from 'next/image';
import * as styles from './mypage.css';
import profileImg from '@/assets/images/profile.png';
import Typography from '@/components/common/Typography';
import { IoLogOutOutline } from 'react-icons/io5';
import { HiOutlinePencil } from 'react-icons/hi2';
import Button from '@/components/common/Button';
import colorPalette from '@/styles/tokens/colorPalette';
import Box from '@/components/common/Box';
import Profile from '@/components/myPage/Profile';
import MyTab from '@/components/myPage/MyTab';

export default function MyPage() {
  const type = '개인';
  const name = '눈사람';
  const totalDonation = 35000;

  return (
    <div className={styles.Wrapper}>
      <Button size="sm" className={styles.modifyButton}>
        <HiOutlinePencil size={20} />
      </Button>
      <div className={styles.mainContainer}>
        <Box className={styles.profileConatainer}>
          <Image
            src={profileImg}
            alt="profile Image"
            width={130}
            height={130}
            className={styles.profileImg}
          />
          <Profile type={type} name={name} totalDonation={totalDonation} />
        </Box>

        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: colorPalette.primary[50],
          }}
        ></div>

        <Box className={styles.tabBox}>
          <MyTab type={type} />
        </Box>

        <div
          style={{
            width: '100%',
            height: '10px',
            margin: '0',
            backgroundColor: colorPalette.primary[50],
          }}
        ></div>

        <Box className={styles.subContainer}>
          <div className={styles.tab}>
            <div className={styles.IconBox}>
              <IoLogOutOutline size={20} color={colorPalette.grey[700]} />
              <Typography as="h4">로그아웃</Typography>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
