import { mergeClasses } from '@/utils/mergeClasses';

import * as s from './ImageItem.css';

interface ImageItemProps {
  src?: string;
  file: File;
  isLoading: boolean;
}

const ImageItem = ({ src, file, isLoading }: ImageItemProps) => {
  return (
    <div className={s.container}>
      <img
        src={isLoading ? URL.createObjectURL(file) : src}
        className={mergeClasses(s.image, isLoading && s.dark)}
        alt="Image"
      />

      {isLoading && <div className={s.loading} />}
    </div>
  );
};

export default ImageItem;
