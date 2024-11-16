import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '0.75rem',
  borderRadius: '0.25rem',
  transition: 'all 0.2s ease',
  userSelect: 'none',

  ':active': {
    backgroundColor: colorPalette.grey[100],
    transform: 'scale(0.95)',
  },

  selectors: {
    '&:nth-of-type(2n)': {
      backgroundColor: colorPalette.grey[100],
    },

    '&:nth-of-type(2n):active': {
      backgroundColor: colorPalette.grey[200],
    },
  },
});
