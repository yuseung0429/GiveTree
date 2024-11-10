'use client';

import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Layout from '@/components/common/Layout';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaTree } from 'react-icons/fa';

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Layout>
      <header>
        <AppBar title="간편계좌 설정" onBackClick={() => router.back()} />
      </header>
      <main style={{ backgroundColor: '#F5F5F5', padding: '1rem' }}>
        <Flex
          alignItems="center"
          justifyContent="center"
          style={{ padding: '1rem 0', margin: '0 auto' }}
        >
          <FaTree
            size={18}
            color={colorPalette.primary[500]}
            style={{ marginRight: '0.25rem' }}
          />
          <Typography
            size={18}
            weight="semiBold"
            color={colorPalette.grey[800]}
          >
            GIVE에서 사용하실 계좌를
            <span
              style={{
                color: `${colorPalette.primary[500]}`,
                margin: '0 0.25rem',
              }}
            >
              등록
            </span>
            해주세요
          </Typography>
        </Flex>
        {children}
      </main>
      <footer style={{ padding: '10px', backgroundColor: '#F5F5F5' }}>
        <Link href="/account/setup">
          <Button size="xl" fullWidth>
            등록하기
          </Button>
        </Link>
      </footer>
    </Layout>
  );
}
