'use client';

import { RecipeVariants } from '@vanilla-extract/recipes';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import * as s from './AppBar.css';

import { HiChevronLeft } from 'react-icons/hi2';

import typography from '@/styles/tokens/typography';

import AppBarMenu from '@/components/common/AppBarMenu';
import Typography from '@/components/common/Typography';

type AppBarVariants = NonNullable<RecipeVariants<typeof s.appbar>>;

interface AppBarProps
  extends AppBarVariants,
    Omit<React.ComponentProps<'div'>, keyof AppBarVariants> {
  children?: ReactNode;
  title: string;
  transparent?: boolean;
  showBackButton?: boolean;
}

const AppBar = ({
  children,
  title,
  transparent = false,
  position = 'static',
  showBackButton = false,
}: AppBarProps) => {
  const router = useRouter();

  return (
    <nav className={s.appbar({ transparent, position })}>
      {showBackButton && (
        <div className={s.left}>
          <AppBarMenu onClick={() => router.back()}>
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
