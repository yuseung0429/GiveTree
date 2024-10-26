import { recipe } from '@vanilla-extract/recipes';
import { createVar, style } from '@vanilla-extract/css';

import colorPalette, { type ColorPalette } from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

const containedVar = {
  backgroundColor: createVar(),
  color: createVar(),
};

const outlinedVar = {
  border: createVar(),
  backgroundColor: createVar(),
  color: createVar(),
};

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.0625rem solid',
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    userSelect: 'none',
  },

  variants: {
    color: Object.keys(colorPalette).reduce((acc, palette) => {
      const color = colorPalette[palette as ColorPalette];

      acc[palette as ColorPalette] = {
        vars: {
          [containedVar.backgroundColor]: color[500],
          [containedVar.color]: '#fff',

          [outlinedVar.border]: color[700],
          [outlinedVar.backgroundColor]: '#fff',
          [outlinedVar.color]: color[500],
        },

        ':active': {
          vars: {
            [containedVar.backgroundColor]: color[700],
            [outlinedVar.backgroundColor]: color[50],
          },
        },

        ':disabled': {
          vars: {
            [containedVar.backgroundColor]: color[100],

            [outlinedVar.border]: color[100],
            [outlinedVar.backgroundColor]: '#fff',
            [outlinedVar.color]: color[100],
          },

          cursor: 'not-allowed',
        },
      };

      return acc;
    }, {} as Record<ColorPalette, object>),

    variant: {
      outlined: {
        backgroundColor: outlinedVar.backgroundColor,
        borderColor: outlinedVar.border,
        color: outlinedVar.color,
      },

      contained: {
        backgroundColor: containedVar.backgroundColor,
        borderColor: containedVar.backgroundColor,
        color: containedVar.color,
      },
    },

    size: {
      sm: {
        height: '2.5rem',
        padding: '0 0.875rem',
        borderRadius: '1.25rem',
        fontSize: typography.size.sm,
      },

      md: {
        height: '2.75rem',
        padding: '0 1rem',
        borderRadius: '1.375rem',
        fontSize: typography.size.md,
      },

      lg: {
        height: '3rem',
        padding: '0 1.125rem',
        borderRadius: '1.5rem',
        fontSize: typography.size.lg,
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
});

export const icon = style({
  marginRight: '0.25rem',
});
