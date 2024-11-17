import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  padding: '1rem',
  borderRadius: '0.5rem',
  transition: 'all 0.2s ease',
  userSelect: 'none',

  ':active': {
    backgroundColor: colorPalette.grey[100],
    transform: 'scale(0.95)',
  },
});
