import * as style from './detail.css';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

const tempIntro =
  '굿네이버스는 1991년 한국에서 설립되어 국내, 북한 및 해외에서 굶주림 없는 세상, 더불어 사는 세상을 만들기 위해 전문사회복지사업과 국제개발협력사업을활발히 수행하고 있는 글로벌 아동권리 전문 NGO입니다.';

export default function IntroTab() {
  return (
    <Box className={style.TabContainer}>
      {/* 단체소개 */}
      <Box as="article" className={style.article}>
        <Typography as="h3" weight="semiBold" color={colorPalette.grey[900]}>
          단체소개
        </Typography>
        <Box className={style.bottomBox}>
          <Typography color={colorPalette.grey[700]}>{tempIntro}</Typography>
        </Box>
      </Box>

      {/* 단체사진 */}
      <Box as="article" className={style.article}>
        <Typography as="h3" weight="semiBold">
          단체사진
        </Typography>
        <Box className={style.bottomBox}>
          {/* 여기에 사진을 api에서 받아온 개수만큼 넣고 싶어. 지금은 임의로 넣어야할 것 같아 */}
          {/* 가로로 스크롤하면서 보이도록 해줘 */}
          <div className={style.imageBox}></div>
          <div className={style.imageBox}></div>
          <div className={style.imageBox}></div>
          <div className={style.imageBox}></div>

        </Box>
      </Box>

      {/* 단체정보 */}
      <Box as="article" className={style.article}>
        <Typography as="h3" weight="semiBold">
          단체정보
        </Typography>
        <Flex gap="15px">
          {/* 공식단체명 */}
          <Box>
            <Typography
              as="h5"
              weight="medium"
              size="16px"
              color={colorPalette.grey[700]}
            >
              공식단체명
            </Typography>
            <Typography>사회복지법인 굿네이버스</Typography>
          </Box>

          {/* 사업자등록번호 */}
          <Box>
            <Typography
              as="h5"
              weight="medium"
              size="16px"
              color={colorPalette.grey[700]}
            >
              사업자등록번호/고유번호
            </Typography>
            <Typography>사회복지법인 굿네이버스</Typography>
          </Box>

          {/* 주소 및 연락처 */}
          <Box>
            <Typography
              as="h5"
              weight="medium"
              size="16px"
              color={colorPalette.grey[700]}
            >
              공식단체명
            </Typography>
            <Typography>사회복지법인 굿네이버스</Typography>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
