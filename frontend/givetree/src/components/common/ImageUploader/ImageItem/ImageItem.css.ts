import { keyframes, style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  width: '6rem',
  height: '6rem',
  borderRadius: '0.375rem',
  backgroundColor: colorPalette.grey[200],
});

const rotate = keyframes({
  '0%': {
    transform: 'rotate(0)',
  },

  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const loading = style({
  position: 'absolute',
  width: '1.625rem',
  height: '1.625rem',
  border: `0.1875rem solid ${colorPalette.secondary[300]}`,
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: `${rotate} 1.5s linear 0s infinite`,
});

export const image = style({
  width: '100%',
  transition: 'filter 0.3s ease',
});

export const dark = style({
  filter: 'contrast(50%)',
});

export const deleteButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '0',
  right: '0',
  width: '2.5rem',
  height: '2.5rem',
  border: '0',
  borderBottomLeftRadius: '0.25rem',
  backgroundColor: 'transparent',
  color: colorPalette.grey[900],
});
