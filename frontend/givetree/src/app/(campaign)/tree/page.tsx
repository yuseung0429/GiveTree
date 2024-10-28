import Tree from '@/components/tree/Tree';
import * as style from './page.css';
import Typography from '@/components/common/Typography';
import Box from '@/components/common/Box';

import colorPalette from '@/styles/tokens/colorPalette';

export default function Page() {
  return (
    <Box className={style.background}>
      <Box className={style.teamText}>
        <Typography as="h3" weight="semiBold">
          사랑의 열매
        </Typography>
        <Box className={style.messageText}>
          <Typography as="h1" weight="bold" color={colorPalette.text[50]}>
            <p
              style={{
                display: 'inline-block',
                color: `${colorPalette.secondary[100]}`,
              }}
            >
              희망 나눔 캠페인
            </p>
            에
          </Typography>
          <Typography as="h2" weight="bold" color={colorPalette.text[50]}>
            <p
              style={{
                display: 'inline-block',
                color: `${colorPalette.secondary[500]}`,
              }}
            >
              6개
            </p>
            의 메세지가 전달됐어요!
          </Typography>
        </Box>
      </Box>
      <Box className={style.treeImage}>
        <Tree />
      </Box>
    </Box>
  );
}
