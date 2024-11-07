import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import colorPalette from '@/styles/tokens/colorPalette';

export const appbar = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
    position: 'relative',
    height: '3.5rem',
  },

  variants: {
    transparent: {
      false: {
        backgroundColor: colorPalette.primary[300],
        color: '#fff',
      },

      true: {
        backgroundColor: 'transparent',
        color: colorPalette.text[900],
      },
    },

    position: {
      static: {
        position: 'static',
      },

      sticky: {
        position: 'sticky',
        top: 0,
      },

      absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      },
    },
  },
});

export const title = style({
  position: 'absolute',
  userSelect: 'none',
});

export const left = style({
  display: 'flex',
  position: 'absolute',
  left: '0.5rem',
});

export const right = style({
  display: 'flex',
  position: 'absolute',
  right: '0.5rem',
  textAlign: 'right',
});
