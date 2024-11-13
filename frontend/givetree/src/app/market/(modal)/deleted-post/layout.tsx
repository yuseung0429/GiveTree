'use client';

import { useRouter } from 'next/navigation';

import AppBar from '@/components/common/AppBar';
import Layout from '@/components/common/Layout';

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Layout>
      <header>
        <AppBar title="거래글" onBackClick={() => router.back()}></AppBar>
      </header>
      <main>{children}</main>
    </Layout>
  );
}
