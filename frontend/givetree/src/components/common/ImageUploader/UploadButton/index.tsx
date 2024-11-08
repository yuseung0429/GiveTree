'use client';

import { useEffect, useRef } from 'react';

import { HiMiniPlus } from 'react-icons/hi2';

import * as s from './UploadButton.css';

interface UploadButtonProps {
  onChange: (fileList: FileList) => void;
}

const UploadButton = ({ onChange }: UploadButtonProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    const file = fileRef.current;

    if (!file) {
      return;
    }

    const handleChange = () => {
      if (!fileRef.current || !fileRef.current.files) {
        return;
      }

      onChange(fileRef.current.files);
    };

    file.addEventListener('change', handleChange);

    return () => {
      file.removeEventListener('change', handleChange);
    };
  }, [fileRef, onChange]);

  return (
    <>
      <div className={s.container} onClick={handleClick}>
        <div className={s.icon}>
          <HiMiniPlus size="1.75rem" />
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/png, image/jpeg"
        multiple
        style={{ display: 'none' }}
      />
    </>
  );
};

export default UploadButton;
