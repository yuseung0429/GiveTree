import { ReactNode } from 'react';

import colorPalette from '@/styles/tokens/colorPalette';
import * as s from './BottomBar.css';

import Typography from '@/components/common/Typography';

interface BottomBarProps {
  children: ReactNode;
}

const BottomBar = ({ children }: BottomBarProps) => {
  return (
    <nav className={s.container}>
      <Typography as="h1" color={colorPalette.text[900]} weight="light">
        {children}
      </Typography>
    </nav>
  );
};

export default BottomBar;
