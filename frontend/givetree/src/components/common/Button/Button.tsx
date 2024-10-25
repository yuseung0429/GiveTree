import { ReactNode } from 'react';

import * as s from './Button.css';

import type { ButtonVariants } from './Button.types';

interface ButtonProps
  extends ButtonVariants,
    Omit<React.ComponentProps<'button'>, keyof ButtonVariants> {
  children: ReactNode;
}

const Button = ({
  children,
  color = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  return (
    <button className={s.button({ color, size })} {...props}>
      {children}
    </button>
  );
};

export default Button;
