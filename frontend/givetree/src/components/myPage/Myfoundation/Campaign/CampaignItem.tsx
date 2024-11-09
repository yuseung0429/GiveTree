import Flex from '@/components/common/Flex';
import * as style from './CampaignItem.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';

export default function CampaignItem() {
  return (
    <Flex gap="1rem" className={style.container}>
      {/* 사진 */}
      <Box className={style.imgbox}>d</Box>

      {/* 설명 */}
      <Flex flexDirection="column" justifyContent="space-between">
        <Typography size={18} weight="semiBold">
          캠페인명
        </Typography>
        <Typography color={colorPalette.grey[600]}>
          2024.03.22 ~ 2024.05.22
        </Typography>
        <Typography weight="medium">목표 금액 : 200,000원</Typography>
        <Typography weight="medium">
          모금 금액 : <span className={style.money}>200,000원</span>
        </Typography>
        <Flex gap={8} style={{ marginTop: '4px' }}>
          <Box
            padding="5px 10px"
            backgroundColor={colorPalette.primary[300]}
            className={style.tag}
          >
            진행중
          </Box>
          <Box
            padding="5px 10px"
            backgroundColor={colorPalette.primary[600]}
            className={style.tag}
          >
            목표달성
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
