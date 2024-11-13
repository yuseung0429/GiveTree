import { CSSProperties, ReactNode } from 'react';

import * as s from './ImageCarousel.css';

interface ImageCarouselProps {
  children: ReactNode;
  height: CSSProperties['height'];
}

const ImageCarousel = ({ children, height }: ImageCarouselProps) => {
  return (
    <div className={s.container} style={{ height }}>
      {children}
    </div>
  );
};

export default ImageCarousel;
