"use client";

import { usePathname } from 'next/navigation';
import BottomBar from '@/components/common/BottomBar';

export default function ConditionalBottomBar() {
  const pathname = usePathname();
  
  return pathname === '/foundation' ? <BottomBar>bottom</BottomBar> : null;
}
