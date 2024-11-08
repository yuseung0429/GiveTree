'use client';

import { useState } from 'react';

import UploadButton from '@/components/common/ImageUploader/UploadButton';

interface ImageUploaderProps {
  maxFileCount?: number;
}

const ImageUploader = ({ maxFileCount = 1 }: ImageUploaderProps) => {
  const [fileList, setFileList] = useState<File[]>([]);

  return (
    <>
      <UploadButton onClick={() => alert(1)} />
    </>
  );
};

export default ImageUploader;
