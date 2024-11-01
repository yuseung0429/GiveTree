import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import * as s from './Flex.css';

import { mergeClasses } from '@/utils/mergeClasses';

interface FlexProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  flexWrap?: CSSProperties['flexWrap'];
  flexDirection?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

const Flex = ({
  children,
  flexWrap,
  flexDirection,
  gap,
  alignItems,
  justifyContent,
  width,
  height,
  className,
  ...props
}: FlexProps) => {
  return (
    <div
      className={mergeClasses(s.flex, className)}
      style={{
        flexWrap,
        flexDirection,
        gap,
        alignItems,
        justifyContent,
        width,
        height,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Flex;
