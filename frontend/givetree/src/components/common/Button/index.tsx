import { ReactNode } from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';

import * as s from './Button.css';

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
  ...props
}: ButtonProps) => {
  return (
    <button
      className={s.button({ color, size, fullWidth, variant })}
      {...props}
    >
      {icon && <span className={s.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
