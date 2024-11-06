import { ReactNode, useId } from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';

import * as s from './CheckboxChip.css';

import { mergeClasses } from '@/utils/mergeClasses';

type CheckboxChipVariants = NonNullable<RecipeVariants<typeof s.checkboxChip>>;

interface CheckboxChipProps
  extends CheckboxChipVariants,
    Omit<React.ComponentProps<'input'>, keyof CheckboxChipVariants> {
  children: ReactNode;
}

const CheckboxChip = ({
  children,
  size = 'md',
  className,
  style,
  ...props
}: CheckboxChipProps) => {
  const id = useId();

  return (
    <span>
      <input
        type="checkbox"
        id={props.id || id}
        className={s.input}
        {...props}
      />
      <label
        htmlFor={props.id || id}
        className={mergeClasses(s.checkboxChip({ size }), className)}
        style={style}
      >
        {children}
      </label>
    </span>
  );
};

export default CheckboxChip;
