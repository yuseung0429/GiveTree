import { ReactNode } from 'react';

import * as s from './Chip.css';

import { RecipeVariants } from '@vanilla-extract/recipes';
import { mergeClasses } from '@/utils/mergeClasses';

type ChipVariants = NonNullable<RecipeVariants<typeof s.chip>>;

interface ChipProps
  extends ChipVariants,
    Omit<React.ComponentProps<'div'>, keyof ChipVariants> {
  children: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

const Chip = ({
  children,
  disabled = false,
  color = 'grey',
  size = 'md',
  variant = 'contained',
  icon,
  ...props
}: ChipProps) => {
  return (
    <div
      className={mergeClasses(
        s.chip({ color, size, variant }),
        disabled && 'disabled',
        props.onClick && 'click'
      )}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className={s.icon}>{icon}</span>}
    </div>
  );
};

export default Chip;
