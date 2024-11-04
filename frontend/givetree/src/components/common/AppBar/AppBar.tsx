import { ReactNode } from 'react';

import * as s from './AppBar.css';

import typography from '@/styles/tokens/typography';

import { HiChevronLeft } from 'react-icons/hi2';

import Typography from '@/components/common/Typography';
import AppBarMenu from '@/components/common/AppBar/AppBarMenu';

interface AppBarProps {
  children?: ReactNode;
  title: string;
  onBackClick?: () => void;
}

const AppBar = ({ children, title, onBackClick }: AppBarProps) => {
  return (
    <nav className={s.container}>
      {onBackClick && (
        <div className={s.left}>
          <AppBarMenu onClick={onBackClick}>
            <HiChevronLeft />
          </AppBarMenu>
        </div>
      )}
      <Typography
        as="h1"
        color="#fff"
        size={typography.size.xl}
        weight="light"
        className={s.title}
      >
        {title}
      </Typography>
      <div className={s.right}>{children}</div>
    </nav>
  );
};

export default AppBar;
