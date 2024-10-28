import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GiveTree',
  description: 'GiveTree',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <nav>
          <a href={'/'}>Home</a> |<Link href={'/abc'}>abc</Link>
        </nav>
        여기는 고정될거야
        {children}
      </body>
    </html>
  );
}
