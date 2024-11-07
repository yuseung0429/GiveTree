import Button, { type ButtonProps } from '@/components/common/Button';

import * as s from './FormButton.css';

interface FormButtonProps extends ButtonProps {
  pending?: boolean;
}

const FormButton = ({
  children,
  pending = false,
  disabled,
  ...props
}: FormButtonProps) => {
  return (
    <Button disabled={disabled || pending} {...props}>
      {pending && <div className={s.loading} />}
      <div className={s.inner}>{children}</div>
    </Button>
  );
};

export default FormButton;
