import { ReactNode } from 'react';

import NotificationModal from '@/components/notification/NotificationModal';

export default function Layout({ children }: { children: ReactNode }) {
  return <NotificationModal>{children}</NotificationModal>;
}
