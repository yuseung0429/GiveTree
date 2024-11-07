import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.75rem',
  borderTop: `0.0625rem solid ${colorPalette.grey[300]}`,
});
