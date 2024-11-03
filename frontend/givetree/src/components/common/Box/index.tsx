import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from 'react';

type BoxProps<T extends ElementType = ElementType> =
  ComponentPropsWithoutRef<T> & {
    children?: ReactNode;
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
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    style?: CSSProperties;
  };

const Box = ({
  children,
  as: Component = 'div',
  width,
  height,
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
  const inlineStyles = Object.entries({
    width,
    height,
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
  }).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, string | number>);

  return (
    <Component style={inlineStyles} {...props}>
      {children}
    </Component>
  );
};

export default Box;
