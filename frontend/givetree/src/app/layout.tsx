import type { Metadata, Viewport } from 'next';

import localFont from 'next/font/local';

import SWRProvider from '@/context/SWRProvider';

import { ModalProvider } from '@/hooks/useModal';

import Notification from '@/components/common/Notification';

import '@/styles/global.css';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GiveTree',
  description: 'GiveTree',
};

export const viewport: Viewport = {
  initialScale: 1.0,
  maximumScale: 1.0,
  minimumScale: 1.0,
  userScalable: false,
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
        <SWRProvider>
          <ModalProvider>
            <Notification />
            {children}
            {modal}
          </ModalProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
