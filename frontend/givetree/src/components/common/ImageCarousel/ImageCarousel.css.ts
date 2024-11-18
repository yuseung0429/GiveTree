import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  overflow: 'auto',
  width: '100%',
  backgroundColor: colorPalette.grey[800],
  scrollSnapType: 'x mandatory',
});
