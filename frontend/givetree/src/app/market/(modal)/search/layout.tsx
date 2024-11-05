'use client';

import { useRouter } from 'next/navigation';

import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Layout>
      <header>
        <AppBar
          title="거래 물품 검색"
          onBackClick={() => router.back()}
        ></AppBar>
      </header>
      <main>{children}</main>
    </Layout>
  );
}
