import colorPalette from '@/styles/tokens/colorPalette';

import { style } from '@vanilla-extract/css';

export const modal = style({
  position: 'fixed',
  inset: 0,
  boxShadow: `0 0 0 0.125rem ${colorPalette.primary[400]}`,
  backgroundColor: '#fff',
});
