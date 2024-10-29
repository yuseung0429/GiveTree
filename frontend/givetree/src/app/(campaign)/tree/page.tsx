import * as styles from './page.css';
import Typography from '@/components/common/Typography';
import Box from '@/components/common/Box';

import colorPalette from '@/styles/tokens/colorPalette';
import TreeSlider from '@/components/tree/TreeSlider';

const messages = [
  {message: '희망 나눔 캠페인에 참여할 수 있어서 너무 감사해요. 몸이 불편한 어르신들께 따뜻한 손길이 되었으면 좋겠어요!', from: '지원산타'},
  {message: '기브 트리를 통해 어려운 곳에 기부할 수 있고, 캠페인에 동참할 수 있어서 너무 좋아요. 감사합니다!', from: '소연산타'},
  {message: '모두 기부 실천합시다!', from: '다운산타'},
  {message: '올해는 꼭 기부를 하고 싶었는데 이렇게 기브트리를 통해 할 수 있어서 너무 좋아요~', from: '유승산타'},
  {message: '모두 이 캠페인에 동참해요!', from: '재민산타'},
  {message: '이렇게 전송한 메세지는 어디로 가나요? 모두가 볼 수 있었으면 좋겠어요!', from: '용진산타'},
  {message: '처음으로 캠페인에 참여했어요! 의미있는 날이네요.', from: '지원산타'},
  {message: '따뜻한 캠페인에 참여할 수 있어서 너무 감사해요.', from: '소연산타'},
  {message: '희망 나눔 캠페인에 참여할 수 있어서 너무 감사해요. ', from: '다운산타'},
  {message: '몸이 불편한 어르신들께 따뜻한 손길이 되었으면 좋겠어요!', from: '유승산타'},
];


export default function Page() {
  return (
    <Box className={styles.background}>
  
      <Box className={styles.teamText}>
        <Typography as="h3" weight="semiBold" color={colorPalette.text[50]}>
          사랑의 열매
        </Typography>
        <Box className={styles.messageText}>
          <Typography as="h1" weight="bold" color={colorPalette.secondary[100]}>
            희망 나눔 캠페인
            <p
              style={{
                display: 'inline-block',
                fontSize: '1.25rem',
                color: `${colorPalette.text[50]}`,
              }}
            >
              에
            </p>
          </Typography>
          <Typography as="h2" weight="bold" color={colorPalette.text[50]}>
            <p
              style={{
                display: 'inline-block',
                color: `${colorPalette.secondary[100]}`,
              }}
            >
              {messages.length}개
            </p>
            의 메세지가 전달됐어요!
          </Typography>
        </Box>
      </Box>
      <Box className={styles.treeImage}>
        <TreeSlider initialMessages={messages}/>
      </Box>
    </Box>
  );
}
