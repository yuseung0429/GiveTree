'use client';

import AppBar from '@/components/common/AppBar';
import Button from '@/components/common/Button';
import Layout from '@/components/common/Layout';
import Link from 'next/link';

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <header>
        <AppBar title="재단트리 환전하기" showBackButton />
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
