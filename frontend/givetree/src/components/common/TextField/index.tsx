import { forwardRef } from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';

import * as s from './TextField.css';

type TextFieldVariants = NonNullable<
  RecipeVariants<typeof s.container> & RecipeVariants<typeof s.textfield>
>;

type TextFieldProps = TextFieldVariants &
  Omit<
    React.ComponentProps<'input'> & React.ComponentProps<'textarea'>,
    keyof TextFieldVariants
  > & {
    variant?: NonNullable<TextFieldVariants['variant']>;
    width?: string;
    height?: string;
    multiline?: boolean;
    disabled?: boolean;
  };

const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(
  (
    {
      color = 'primary',
      size = 'md',
      variant = 'outlined',
      width = '100%',
      height = '3rem',
      disabled = false,
      multiline = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={s.container({ color, variant })} style={{ width }}>
        {multiline ? (
          <textarea
            className={s.textfield({ size })}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            disabled={disabled}
            style={{ height }}
            {...props}
          />
        ) : (
          <input
            type="text"
            className={s.textfield({ size })}
            ref={ref as React.Ref<HTMLInputElement>}
            disabled={disabled}
            {...props}
          />
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
