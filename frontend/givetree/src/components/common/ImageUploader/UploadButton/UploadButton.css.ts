import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '6rem',
  height: '6rem',
  borderRadius: '0.375rem',
  backgroundColor: colorPalette.grey[200],
});

export const icon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '50%',
  backgroundColor: '#fff',
  color: colorPalette.grey[600],
});
