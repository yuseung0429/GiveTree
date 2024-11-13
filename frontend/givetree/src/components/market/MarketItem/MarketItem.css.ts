import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const wrapper = style({
  transition: 'all 0.2s ease',

  ':active': {
    backgroundColor: colorPalette.grey[50],
  },

  selectors: {
    '&:not(:last-of-type)': {
      borderBottom: `0.0625rem solid ${colorPalette.grey[100]}`,
    },
  },
});

export const container = style({
  padding: '1rem',
  transition: 'all 0.2s ease',
  willChange: 'transform',

  selectors: {
    [`${wrapper}:active &`]: {
      transform: 'scale(0.95)',
    },
  },
});

export const imageWrapper = style({
  flex: '0 0 auto',
  position: 'relative',
  overflow: 'hidden',
  width: '6rem',
  height: '6rem',
  padding: '1rem',
  borderRadius: '0.75rem',
  backgroundColor: '#eee',
});
