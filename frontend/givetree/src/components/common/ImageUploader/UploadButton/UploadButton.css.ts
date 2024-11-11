import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '6rem',
  height: '6rem',
  border: `0.125rem dashed ${colorPalette.grey[600]}`,
  borderRadius: '0.375rem',
  backgroundColor: colorPalette.grey[200],
});

export const icon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  color: colorPalette.grey[600],
});
