import { ReactNode, useCallback } from 'react';

import useModal from '../useModal';

import Alert from './Alert';
import Confirm from './Confirm';

const useDialog = () => {
  const modal = useModal();

  const alert = useCallback(
    (message: ReactNode) => {
      return new Promise((resolve) => {
        modal.push({
          children: <Alert onClose={() => modal.pop()}>{message}</Alert>,
          animation: 'alert',
          onClose: () => {
            resolve(true);
          },
        });
      });
    },
    [modal]
  );

  const confirm = useCallback(
    (message: ReactNode): Promise<boolean> => {
      return new Promise((resolve) => {
        let result = false;
        modal.push({
          children: (
            <Confirm
              onClose={(confirm) => {
                result = confirm;
                modal.pop();
              }}
            >
              {message}
            </Confirm>
          ),
          animation: 'alert',
          onClose: () => {
            resolve(result);
          },
        });
      });
    },
    [modal]
  );

  return { alert, confirm };
};

export default useDialog;
