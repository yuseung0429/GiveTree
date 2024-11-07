import { ReactNode } from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';

import * as s from './AppBar.css';

import { HiChevronLeft } from 'react-icons/hi2';

import typography from '@/styles/tokens/typography';

import Typography from '@/components/common/Typography';
import AppBarMenu from '@/components/common/AppBar/AppBarMenu';

type AppBarVariants = NonNullable<RecipeVariants<typeof s.appbar>>;

interface AppBarProps
  extends AppBarVariants,
    Omit<React.ComponentProps<'div'>, keyof AppBarVariants> {
  children?: ReactNode;
  title: string;
  transparent?: boolean;
  onBackClick?: () => void;
}

const AppBar = ({
  children,
  title,
  transparent = false,
  position = 'static',
  onBackClick,
}: AppBarProps) => {
  return (
    <nav className={s.appbar({ transparent, position })}>
      {onBackClick && (
        <div className={s.left}>
          <AppBarMenu onClick={onBackClick}>
            <HiChevronLeft />
          </AppBarMenu>
        </div>
      )}

      {!transparent && (
        <Typography
          as="h2"
          color="inherit"
          size={typography.size.xl}
          weight="semiBold"
          className={s.title}
        >
          {title}
        </Typography>
      )}

      <div className={s.right}>{children}</div>
    </nav>
  );
};

export default AppBar;
