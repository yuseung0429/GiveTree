import {
  HiMiniXCircle,
  HiMiniXMark,
  HiOutlineXMark,
  HiTrash,
  HiXMark,
} from 'react-icons/hi2';

import { mergeClasses } from '@/utils/mergeClasses';

import * as s from './ImageItem.css';

interface ImageItemProps {
  src?: string;
  file: File;
  isLoading: boolean;
  onDeleteClick: () => void;
}

const ImageItem = ({ src, file, isLoading, onDeleteClick }: ImageItemProps) => {
  return (
    <div className={s.container}>
      <img
        src={isLoading ? URL.createObjectURL(file) : src}
        className={mergeClasses(s.image, isLoading && s.dark)}
        alt="Image"
      />
      {isLoading ? (
        <div className={s.loading} />
      ) : (
        <button className={s.deleteButton}>
          <HiMiniXCircle size="2rem" onClick={onDeleteClick} />
        </button>
      )}
    </div>
  );
};

export default ImageItem;
