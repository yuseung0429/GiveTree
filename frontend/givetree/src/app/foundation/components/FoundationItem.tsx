import Box from '@/components/common/Box';
import * as style from './FoundationItemStyle.css'
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { MdNavigateNext } from "react-icons/md";

export default function FoundationItem() {
  return (
    <Box className={style.container}>
      <Flex gap='15px' alignItems='center'>
        {/* 이미지 */}
        <div className={style.foundationLogo}></div>

        {/* 텍스트 */}
        <Box className={style.textbox}>
          <Typography as='h4' weight='semiBold'>사회복지 법인 굿네이버스</Typography>
          <Typography className={style.descript}>굿네이버스는 1991년 설립되어 국내, 북한fdfsfds</Typography>
        </Box>
      </Flex>

      {/* 버튼 */}
      <Box className={style.btn}>
        <MdNavigateNext size={30} color='grey' />
      </Box>
    </Box>
  );
}