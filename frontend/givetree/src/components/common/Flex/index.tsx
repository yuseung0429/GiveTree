import { CSSProperties, ReactNode } from 'react';

import * as s from './Flex.css';

interface FlexProps {
  children: ReactNode;
  flexWrap?: CSSProperties['flexWrap'];
  flexDirection?: CSSProperties['flexDirection'];
  gap?: string;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
}

const Flex = ({ children, ...props }: FlexProps) => {
  return (
    <div className={s.flex} style={{ ...props }}>
      {children}
    </div>
  );
};

export default Flex;
