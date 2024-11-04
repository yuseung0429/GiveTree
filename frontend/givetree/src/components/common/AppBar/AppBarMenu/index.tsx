import { ReactNode } from 'react';

import * as s from './AppBarMenu.css';

interface AppBarMenuProps extends React.ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
}

const AppBarMenu = ({ children, ...props }: AppBarMenuProps) => {
  return (
    <button className={s.menu} {...props}>
      {children}
    </button>
  );
};

export default AppBarMenu;
