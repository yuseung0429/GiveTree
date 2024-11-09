'use client';

import { HiMiniPlus } from 'react-icons/hi2';

import * as s from './UploadButton.css';

interface UploadButtonProps {
  onClick: () => void;
}

const UploadButton = ({ onClick }: UploadButtonProps) => {
  return (
    <div className={s.container} onClick={onClick}>
      <div className={s.icon}>
        <HiMiniPlus size="2rem" />
      </div>
    </div>
  );
};

export default UploadButton;
