import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
