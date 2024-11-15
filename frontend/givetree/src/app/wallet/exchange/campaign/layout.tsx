'use client';

import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import Layout from '@/components/common/Layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Layout>
      <header>
        <AppBar title="캠페인트리 환전하기" onBackClick={() => router.back()} />
      </header>
      <main style={{ backgroundColor: '#F5F5F5' }}>{children}</main>
      <footer style={{ padding: '10px', backgroundColor: '#F5F5F5' }}>
        <Link href="/wallet/exchange/password">
          <Button size="xl" fullWidth>
            출금 신청
          </Button>
        </Link>
      </footer>
    </Layout>
  );
}
