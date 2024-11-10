import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/global.css';
import { ModalProvider } from '@/hooks/useModal';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GiveTree',
  description: 'GiveTree',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <ModalProvider>
          {children}
          {modal}
        </ModalProvider>
      </body>
    </html>
  );
}
