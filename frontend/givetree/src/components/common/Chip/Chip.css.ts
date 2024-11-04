import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import colorPalette, { type ColorPalette } from '@/styles/tokens/colorPalette';

const colorVar = {
  main: createVar(),
  active: createVar(),
  disabled: createVar(),
};

export const chip = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: '0',
    gap: '0.125rem',
    transition: 'all 0.2s ease',
    cursor: 'default',
    userSelect: 'none',
  },

  variants: {
    color: Object.keys(colorPalette).reduce((acc, palette) => {
      const color = colorPalette[palette as ColorPalette];

      acc[palette as ColorPalette] = style({
        vars: {
          [colorVar.main]: color[300],
          [colorVar.active]: color[400],
          [colorVar.disabled]: color[50],
        },
      });

      return acc;
    }, {} as Record<ColorPalette, string>),

    variant: {
      contained: {
        backgroundColor: colorVar.main,
        color: colorPalette.text[900],

        '&.click:not(.disabled)': {
          cursor: 'pointer',

          '&:active': {
            backgroundColor: colorVar.active,
          },
        },

        '&.disabled': {
          backgroundColor: colorVar.disabled,
        },
      },
      outlined: {
        boxShadow: `inset 0 0 0 0.0625rem ${colorVar.main}`,
        backgroundColor: '#fff',
        color: colorVar.main,

        '&.click:not(.disabled)': {
          cursor: 'pointer',

          '&:active': {
            boxShadow: `inset 0 0 0 0.0625rem ${colorVar.active}`,
            color: colorVar.active,
          },
        },

        '&.disabled': {
          boxShadow: `inset 0 0 0 0.0625rem ${colorVar.disabled}`,
          color: colorVar.disabled,
        },
      },
    },

    size: {
      sm: {
        height: '1.5rem',
        padding: '0 0.625rem',
        borderRadius: '0.625rem',
        fontSize: '0.75rem',
      },

      md: {
        height: '1.75rem',
        padding: '0 0.75rem',
        borderRadius: '0.75rem',
        fontSize: '0.875rem',
      },

      lg: {
        height: '2rem',
        padding: '0 0.875rem',
        borderRadius: '0.875rem',
        fontSize: '1rem',
      },
    },
  },
});

export const icon = style({
  marginRight: '-0.25rem',
});
