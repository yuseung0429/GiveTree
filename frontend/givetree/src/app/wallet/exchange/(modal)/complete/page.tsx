import Button from '@/components/common/Button';
import Layout from '@/components/common/Layout';
import * as style from './completeModal.css';
import Box from '@/components/common/Box';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import Typography from '@/components/common/Typography';
import Flex from '@/components/common/Flex';
import colorPalette from '@/styles/tokens/colorPalette';
import Link from 'next/link';

export default function CompletePage() {
  return (
    <Layout>
      <main style={{ backgroundColor: '#F5F5F5', paddingTop: '56px' }}>
        <Box>
          <Flex
            flexDirection="column"
            alignItems="center"
            className={style.textbox}
          >
            <FaHeartCircleCheck size={60} color={colorPalette.primary[400]} />
            <Typography weight="bold" size={28}>
              출금 신청 완료
            </Typography>
            <Typography>
              보낸 지갑에서 확인하는 데<br />
              최대 10분까지 소요됩니다.
            </Typography>
          </Flex>
        </Box>
      </main>
      <footer style={{ padding: '10px', backgroundColor: '#F5F5F5' }}>
        <Link href="/wallet">
          <Button size="xl" fullWidth>
            확인
          </Button>
        </Link>
      </footer>
    </Layout>
  );
}
