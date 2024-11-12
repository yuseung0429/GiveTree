import { ReactNode } from 'react';

import usePreventKeyboardInput from '../hooks/usePreventKeyboardInput';

interface ConfirmProps {
  children: ReactNode;
  onClose: (confirm: boolean) => void;
}

const Confirm = ({ children, onClose }: ConfirmProps) => {
  usePreventKeyboardInput();

  return (
    <div>
      <div>{children}</div>
      <div>
        <button color="success" onClick={() => onClose(true)}>
          예
        </button>
        <button color="danger" onClick={() => onClose(false)}>
          아니오
        </button>
      </div>
    </div>
  );
};

export default Confirm;
