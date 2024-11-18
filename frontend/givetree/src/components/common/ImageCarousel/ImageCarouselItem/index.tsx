import * as s from './ImageCarouselItem.css';

interface ImageCarouselItemProps {
  src: string;
  alt: string;
}

/* eslint-disable @next/next/no-img-element */
const ImageCarouselItem = ({ src, alt }: ImageCarouselItemProps) => {
  return (
    <div className={s.container}>
      <img src={src} alt={alt} className={s.image} />
    </div>
  );
};

export default ImageCarouselItem;
