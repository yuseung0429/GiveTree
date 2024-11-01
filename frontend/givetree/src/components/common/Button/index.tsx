import { ReactNode } from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';

import * as s from './Button.css';

import { mergeClasses } from '@/utils/mergeClasses';

type ButtonVariants = NonNullable<RecipeVariants<typeof s.button>>;

interface ButtonProps
  extends ButtonVariants,
    Omit<React.ComponentProps<'button'>, keyof ButtonVariants> {
  children: ReactNode;
  icon?: ReactNode;
}

const Button = ({
  children,
  icon,
  color = 'primary',
  size = 'md',
  variant = 'contained',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={mergeClasses(
        s.button({ color, size, fullWidth, variant }),
        className
      )}
      {...props}
    >
      {icon && <span className={s.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
