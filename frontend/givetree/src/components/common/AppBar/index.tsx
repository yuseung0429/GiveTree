import { ReactNode } from 'react';

import * as s from './AppBar.css';

import Typography from '@/components/common/Typography';

interface AppBarProps {
  children: ReactNode;
}

const AppBar = ({ children }: AppBarProps) => {
  return (
    <nav className={s.container}>
      <Typography as="h1" color="#fff" weight="light">
        {children}
      </Typography>
    </nav>
  );
};

export default AppBar;
