import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import * as s from './Typography.css';

import { mergeClasses } from '@/utils/mergeClasses';

import typography from '@/styles/tokens/typography';

type TypographyElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyProps<T extends TypographyElement = TypographyElement> =
  ComponentPropsWithoutRef<T> & {
    children: ReactNode;
    as?: T;
    color?: string;
    size?: keyof typeof typography.size | CSSProperties['fontSize'];
    weight?: keyof typeof typography.weight;
    ellipsis?: boolean;
  };

const Typography = ({
  children,
  as: Component = 'p',
  color,
  size,
  weight = 'regular',
  ellipsis = false,
  style,
  ...props
}: TypographyProps) => {
  return (
    <Component
      className={mergeClasses(ellipsis && s.ellipsis)}
      style={{
        ...style,
        color,
        fontSize: size,
        fontWeight: typography.weight[weight],
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
