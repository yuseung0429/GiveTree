import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 auto',
  position: 'relative',
  height: '3.5rem',
  backgroundColor: colorPalette.primary[300],
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
