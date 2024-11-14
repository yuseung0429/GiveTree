import { keyframes, style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
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
  width: '3rem',
  height: '3rem',
  border: `0.25rem solid ${colorPalette.primary[300]}`,
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: `${rotate} 1.5s linear 0s infinite`,
});
