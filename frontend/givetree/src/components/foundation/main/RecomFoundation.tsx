import * as style from './RecomFoundationStyle.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import { Foundation } from '@/api/foundation/getFoundation';

interface RecomFoundationProps {
  foundation: Foundation | undefined;
}

export default function RecomFoundation({ foundation }: RecomFoundationProps) {
  if (!foundation) {
    return null;
  }

  return (
    <Box className={style.container}>
      {/* 이미지 */}
      <div
        className={style.imageBox}
        style={{
          backgroundImage: foundation.titleImageUrl
            ? `url(${foundation.titleImageUrl})`
            : 'none',
          backgroundColor: 'white',
        }}
      />

      {/* 텍스트 */}
      <Box className={style.overlayBox}>
        <Typography
          as="h3"
          size={22}
          weight="semiBold"
          className={style.imgTitle}
        >
          {foundation.name}
        </Typography>
      </Box>
    </Box>
  );
}
