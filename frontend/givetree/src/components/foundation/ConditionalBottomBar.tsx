'use client';

import { usePathname } from 'next/navigation';
import NavigationBar from '@/components/common/NavigationBar';

export default function ConditionalBottomBar() {
  const pathname = usePathname();

  return pathname === '/foundation' ? <NavigationBar /> : null;
}
