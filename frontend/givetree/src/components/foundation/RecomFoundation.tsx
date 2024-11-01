import * as style from './RecomFoundationStyle.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';

export default function RecomFoundation() {
  return (
    <Box className={style.container}>
      {/* 이미지 */}
      <div className={style.imageBox}></div>

      {/* 텍스트 */}
      <Box className={style.overlayBox}>
        <Typography
          as="h4"
          size="18px"
          weight="semiBold"
          className={style.imgTitle}
        >
          나눔어린이 재단
        </Typography>
      </Box>
    </Box>
  );
}
