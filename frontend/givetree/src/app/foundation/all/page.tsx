import FoundationItem from "@/app/foundation/components/FoundationItem";
import Box from "@/components/common/Box";
import * as style from '@/app/foundation/all/all.css'
import Flex from "@/components/common/Flex";
import TabItem from "@/app/foundation/all/TabItem";

export default async function AllFoundation() {
  return (
    <Box className={style.mainBg}>
      {/* 카테고리 탭 */}
      <Flex >
        <TabItem />
      </Flex>

      {/* 재단 리스트 */}
      <Box className={style.listBox}>
        <Flex flexDirection="column" gap="10px">
          <FoundationItem />
          <FoundationItem />
          <FoundationItem />
          <FoundationItem />
          <FoundationItem />
        </Flex>
      </Box>
      
    </Box>
  );
}