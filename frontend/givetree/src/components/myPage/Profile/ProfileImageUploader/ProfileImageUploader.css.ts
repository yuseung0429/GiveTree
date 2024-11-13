import { globalStyle, style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  gap: '0.5rem',
  overflow: 'scroll',
  padding: '1rem',
  borderRadius: '0.25rem',
  backgroundColor: colorPalette.grey[300],
});

globalStyle(`${container} > div`, {
  flexShrink: '0',
});
