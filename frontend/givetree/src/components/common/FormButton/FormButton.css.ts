import { keyframes, style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

const pulse = keyframes({
  '0%': {
    backgroundPosition: '-200% 0',
  },

  '100%': {
    backgroundPosition: '200% 0',
  },
});

export const loading = style({
  position: 'absolute',
  inset: '0',
  background: `linear-gradient(90deg, ${colorPalette.grey[50]} 0%, ${colorPalette.grey[900]} 50%, ${colorPalette.grey[50]} 100%)`,
  backgroundSize: '200% 100%',
  animation: `${pulse} 2s linear 0s infinite`,
  opacity: 0.1,
});

export const inner = style({
  position: 'relative',
});
