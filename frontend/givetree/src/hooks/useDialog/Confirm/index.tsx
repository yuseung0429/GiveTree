import { ReactNode } from 'react';

interface ConfirmProps {
  children: ReactNode;
  onClose: (confirm: boolean) => void;
}

const Confirm = ({ children, onClose }: ConfirmProps) => {
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
