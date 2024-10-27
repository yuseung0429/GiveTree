import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from 'react';

type BoxProps<T extends ElementType = ElementType> =
  ComponentPropsWithoutRef<T> & {
    children: ReactNode;
    as?: T;
    margin?: CSSProperties['margin'];
    marginTop?: CSSProperties['marginTop'];
    marginRight?: CSSProperties['marginRight'];
    marginBottom?: CSSProperties['marginBottom'];
    marginLeft?: CSSProperties['marginLeft'];
    padding?: CSSProperties['padding'];
    paddingTop?: CSSProperties['paddingTop'];
    paddingRight?: CSSProperties['paddingRight'];
    paddingBottom?: CSSProperties['paddingBottom'];
    paddingLeft?: CSSProperties['paddingLeft'];
    border?: CSSProperties['border'];
    borderRadius?: CSSProperties['borderRadius'];
    backgroundColor?: CSSProperties['backgroundColor'];
    style?: CSSProperties;
  };

const Box = ({
  children,
  as: Component = 'div',
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  border,
  borderRadius,
  backgroundColor,
  style,
  ...props
}: BoxProps) => {
  return (
    <Component
      style={{
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        padding,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        border,
        borderRadius,
        backgroundColor,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Box;
