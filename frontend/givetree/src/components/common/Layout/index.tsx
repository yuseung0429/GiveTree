import { ReactNode } from 'react';

import * as s from './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className={s.layout}>{children}</div>;
};

export default Layout;
