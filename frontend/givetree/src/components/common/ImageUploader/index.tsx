'use client';

import { ComponentPropsWithRef, useEffect, useRef, useState } from 'react';

import useImageUpload, { type ImageData } from '@/hooks/useImageUpload';

import ImageItem from './ImageItem';
import UploadButton from './UploadButton';

import * as s from './ImageUploader.css';

interface ImageUploaderProps
  extends Omit<ComponentPropsWithRef<'input'>, 'name' | 'defaultValue'> {
  name?: string;
  maxFileCount?: number;
  defaultValue?: string[];
  onUpload?: (images: string[]) => void;
}

const ImageUploader = ({
  name,
  maxFileCount = 5,
  defaultValue = [],
  onUpload,
  ...props
}: ImageUploaderProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<ImageData[]>(
    defaultValue.map((item, index) => {
      return { key: index + 1, url: item, done: true };
    })
  );

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    onUpload?.(
      images.filter((image) => image.done).map((image) => image.url || '')
    );

    container.scrollLeft = container.scrollWidth;
  }, [images, onUpload]);

  const { select, upload } = useImageUpload(
    fileRef,
    {
      onSelect: (fileList: FileList) => {
        if (fileList.length + images.length > maxFileCount) {
          alert(`최대 ${maxFileCount}개의 이미지만 업로드 할 수 있습니다.`);
          return;
        }

        upload((files) => setImages((images) => [...images, ...files]));
      },

      onUpload: (key, url) => {
        setImages((images) =>
          images.reduce((acc, current) => {
            if (current.key !== key) {
              return [...acc, current];
            }

            return [...acc, { ...current, done: true, url }];
          }, [] as ImageData[])
        );
      },

      onError: (key, status) => {
        setImages((images) => images.filter((image) => image.key !== key));

        switch (status) {
          case 413:
            alert('10MB를 초과하는 이미지는 업로드 할 수 없습니다.');
            break;
          default:
            alert('알 수 없는 오류로 이미지를 업로드에 실패했습니다.');
        }
      },
    },
    defaultValue.length
  );

  const handleUploadClick = () => {
    select();
  };

  const handleDeleteClick = (key: number) => {
    setImages((images) => images.filter((image) => image.key !== key));
  };

  return (
    <div className={s.container} ref={containerRef}>
      <input
        type="hidden"
        value={images.filter((image) => image.done).length}
        {...props}
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/png, image/jpeg"
        multiple
        style={{ display: 'none' }}
      />

      {images.map((image) => (
        <ImageItem
          key={image.key}
          file={image.file}
          src={image.url}
          isLoading={!image.done}
          onDeleteClick={() => handleDeleteClick(image.key)}
        />
      ))}

      {images.length < maxFileCount && (
        <UploadButton onClick={handleUploadClick} />
      )}

      {name &&
        images
          .filter((image) => image.done)
          .map((image) => (
            <input
              type="hidden"
              key={image.key}
              name={name}
              value={image.url}
            />
          ))}
    </div>
  );
};

export default ImageUploader;
