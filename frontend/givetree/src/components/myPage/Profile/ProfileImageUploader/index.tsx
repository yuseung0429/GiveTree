'use client';

import { useRef, useState } from 'react';
import * as styles from '../EditUser/EditUser.css';

import useImageUpload, { type ImageData } from '@/hooks/useImageUpload';

import { HiOutlinePlusCircle } from 'react-icons/hi2';
import Image, { StaticImageData } from 'next/image';

interface ProfileImageUploaderProps {
  name?: string;
  defaultValue: StaticImageData | string;
}

const ProfileImageUploader = ({
  name,
  defaultValue,
}: ProfileImageUploaderProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<ImageData>();

  const { select, upload } = useImageUpload(fileRef, {
    onSelect: (fileList: FileList) => {
      if (fileList.length > 1) {
        alert(`최대 1개의 이미지만 업로드 할 수 있습니다.`);
        return;
      }

      upload((image) => setImage(image[0]));
    },

    onUpload: (key, url) => {
      setImage((value) => {
        if (!value) {
          return;
        }
        return { ...value, url };
      });
    },

    onError: (key, status) => {
      switch (status) {
        case 413:
          alert('1MB를 초과하는 이미지는 업로드 할 수 없습니다.');
          break;
        default:
          alert('알 수 없는 오류로 이미지를 업로드에 실패했습니다.');
      }
    },
  });

  const handleUploadClick = () => {
    select();
  };

  return (
    <>
      <div className={styles.changeImage}>
        <HiOutlinePlusCircle size={28} onClick={handleUploadClick} />
      </div>
      <Image
        src={image?.url || defaultValue}
        alt="profile Image"
        width={130}
        height={130}
        className={styles.profileImg}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/png, image/jpeg"
        multiple
        style={{ display: 'none' }}
      />
      <input type="hidden" name={name} value={image?.url || ''} />
    </>
  );
};

export default ProfileImageUploader;
