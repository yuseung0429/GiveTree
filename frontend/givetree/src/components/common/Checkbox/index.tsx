import { ReactNode, useId } from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';

import * as s from './Checkbox.css';

import typography from '@/styles/tokens/typography';

import { mergeClasses } from '@/utils/mergeClasses';

import Typography from '@/components/common/Typography';

type CheckboxVariants = NonNullable<RecipeVariants<typeof s.checkbox>>;

interface CheckboxProps
  extends CheckboxVariants,
    Omit<React.ComponentProps<'input'>, keyof CheckboxVariants> {
  children: ReactNode;
}

const Checkbox = ({
  children,
  color = 'primary',
  size = 'md',
  className,
  style,
  ...props
}: CheckboxProps) => {
  const id = useId();

  return (
    <label
      htmlFor={props.id || id}
      className={mergeClasses(s.container, className)}
      style={style}
    >
      <input
        type="checkbox"
        id={props.id || id}
        className={s.input}
        {...props}
      />
      <div className={s.checkbox({ color, size })}>
        <svg width="64" height="64" className={s.icon}>
          <polyline points="53 16 24 45 11 32"></polyline>
        </svg>
      </div>
      <Typography size={typography.size[size]} className={s.text}>
        {children}
      </Typography>
    </label>
  );
};

export default Checkbox;
