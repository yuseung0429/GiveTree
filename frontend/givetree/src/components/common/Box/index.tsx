import { CSSProperties, ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
  as?:
    | 'div'
    | 'article'
    | 'aside'
    | 'details'
    | 'dialog'
    | 'figcaption'
    | 'figure'
    | 'footer'
    | 'header'
    | 'main'
    | 'mark'
    | 'nav'
    | 'section'
    | 'summary';
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
}

const Box = ({ children, as: As = 'div', style, ...props }: BoxProps) => {
  return <As style={{ ...props, ...style }}>{children}</As>;
};

export default Box;
