import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import colorPalette, { type ColorPalette } from '@/styles/tokens/colorPalette';

const fillVar = createVar();

export const progressIndicator = recipe({
  base: {
    position: 'sticky',
    top: 0,
  },

  variants: {
    color: Object.keys(colorPalette).reduce((acc, palette) => {
      const color = colorPalette[palette as ColorPalette];

      acc[palette as ColorPalette] = style({
        vars: {
          [fillVar]: color[500],
        },

        backgroundColor: color[50],
      });

      return acc;
    }, {} as Record<ColorPalette, string>),

    size: {
      sm: {
        height: '0.25rem',
      },

      md: {
        height: '0.5rem',
      },

      lg: {
        height: '0.75rem',
      },
    },
  },
});

export const fill = style({
  position: 'absolute',
  inset: '0 auto 0 0',
  backgroundColor: fillVar,
  transition: 'all 0.2s ease',
});
