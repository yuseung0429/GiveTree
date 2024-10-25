import { recipe } from '@vanilla-extract/recipes';

import colorPalette, { type ColorPalette } from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

export const button = recipe({
  base: {
    border: 0,
    backgroundColor: '#fff',
    color: colorPalette.text[900],
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    userSelect: 'none',
  },

  variants: {
    color: Object.keys(colorPalette).reduce((acc, palette) => {
      const color = colorPalette[palette as ColorPalette];

      acc[palette as ColorPalette] = {
        backgroundColor: color[500],
        color: '#fff',

        ':active': {
          backgroundColor: color[700],
        },

        ':disabled': {
          backgroundColor: color[100],
          cursor: 'not-allowed',
        },
      };

      return acc;
    }, {} as Record<ColorPalette, object>),

    size: {
      sm: {
        padding: '0.75rem',
        borderRadius: '1.5rem',
        fontSize: typography.size.sm,
      },
      md: {
        padding: '1rem',
        borderRadius: '2rem',
        fontSize: typography.size.md,
      },
      lg: {
        padding: '1.25rem',
        borderRadius: '2.5rem',
        fontSize: typography.size.lg,
      },
    },
  },
});
