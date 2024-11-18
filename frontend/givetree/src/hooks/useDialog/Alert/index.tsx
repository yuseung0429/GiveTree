import { ReactNode } from 'react';

import usePreventKeyboardInput from '../hooks/usePreventKeyboardInput';

import * as s from './Alert.css';

interface AlertProps {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: AlertProps) => {
  usePreventKeyboardInput();

  return (
    <div className={s.container}>
      <div className={s.message}>{children}</div>
      <div className={s.buttonContainer}>
        <button className={s.button} onClick={() => onClose()}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
