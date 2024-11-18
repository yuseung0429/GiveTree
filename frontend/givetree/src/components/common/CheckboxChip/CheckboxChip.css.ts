import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import colorPalette from '@/styles/tokens/colorPalette';

export const input = style({
  display: 'none',
});

export const checkboxChip = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.0625rem solid',
    borderColor: colorPalette.grey[400],
    backgroundColor: '#fff',
    color: colorPalette.text[900],
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    userSelect: 'none',

    selectors: {
      [`${input}:checked + &`]: {
        borderColor: '#005b52',
        backgroundColor: '#005b52',
        color: colorPalette.grey[50],
      },

      [`${input}:disabled:checked + &`]: {
        borderColor: colorPalette.grey[400],
        backgroundColor: colorPalette.grey[200],
        color: colorPalette.text[300],
      },

      [`${input}:disabled:not(:checked) + &`]: {
        borderColor: colorPalette.grey[300],
        backgroundColor: '#fff',
        color: colorPalette.text[300],
      },
    },
  },

  variants: {
    size: {
      sm: {
        height: '1.875rem',
        padding: '0 0.5rem',
        borderRadius: '0.25rem',
        fontSize: '0.75rem',
      },

      md: {
        height: '2.25rem',
        padding: '0 0.75rem',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
      },

      lg: {
        height: '2.75rem',
        padding: '0 0.875rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
      },
    },
  },
});
