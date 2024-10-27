import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import typography from '@/styles/tokens/typography';

type TypographyElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyProps<T extends TypographyElement = TypographyElement> =
  ComponentPropsWithoutRef<T> & {
    children: ReactNode;
    as?: T;
    color?: string;
    size?: keyof typeof typography.size | CSSProperties['fontSize'];
    weight?: keyof typeof typography.weight;
  };

const Typography = ({
  children,
  as: Component = 'p',
  color,
  size,
  weight = 'normal',
  style,
  ...props
}: TypographyProps) => {
  return (
    <Component
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
