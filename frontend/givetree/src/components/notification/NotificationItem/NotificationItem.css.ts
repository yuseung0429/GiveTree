import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '1rem',
  borderRadius: '0.5rem',
  backgroundColor: colorPalette.primary[50],
  transition: 'all 0.2s ease',
  userSelect: 'none',

  ':active': {
    backgroundColor: colorPalette.primary[100],
    transform: 'scale(0.95)',
  },
});
