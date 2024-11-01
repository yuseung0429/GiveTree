import * as style from './detail.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';

export default function DonationTab() {
  return (
    <Box as="article" className={style.TabContainer}>
      {/* 모금함 */}
      <Box>
        <Typography as="h3" weight="medium">
          단체소개
        </Typography>
        <Box>
          <Typography>여기에 단체에 대한 상세 내용이 들어갑니다...</Typography>
        </Box>
      </Box>
    </Box> 
  );
}
