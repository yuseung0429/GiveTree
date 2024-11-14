import { ReactNode } from 'react';

import usePreventKeyboardInput from '../hooks/usePreventKeyboardInput';

import * as s from './Confirm.css';

interface ConfirmProps {
  children: ReactNode;
  onClose: (confirm: boolean) => void;
}

const Confirm = ({ children, onClose }: ConfirmProps) => {
  usePreventKeyboardInput();

  return (
    <div className={s.container}>
      <div className={s.message}>{children}</div>
      <div className={s.buttonContainer}>
        <button
          className={s.button({ color: 'primary' })}
          color="success"
          onClick={() => onClose(true)}
        >
          예
        </button>
        <button
          className={s.button({ color: 'secondary' })}
          color="danger"
          onClick={() => onClose(false)}
        >
          아니오
        </button>
      </div>
    </div>
  );
};

export default Confirm;
