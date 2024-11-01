import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>검색 헤더</div>
      <main>{children}</main>
    </div>
  );
}
