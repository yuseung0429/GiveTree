import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import colorPalette, { ColorPalette } from '@/styles/tokens/colorPalette';

const containedVar = {
  backgroundColor: createVar(),
  color: createVar(),
};

const outlinedVar = {
  border: createVar(),
  backgroundColor: createVar(),
  color: createVar(),
};

export const container = recipe({
  base: {
    overflow: 'hidden',
    borderRadius: '0.25rem',
    lineHeight: '0',
    transition: 'all 0.1s ease',
  },

  variants: {
    color: Object.keys(colorPalette).reduce((acc, palette) => {
      const color = colorPalette[palette as ColorPalette];

      acc[palette as ColorPalette] = style({
        vars: {
          [containedVar.backgroundColor]: color[100],
          [containedVar.color]: colorPalette.text[600],

          [outlinedVar.border]: colorPalette.grey[500],
          [outlinedVar.backgroundColor]: '#fff',
          [outlinedVar.color]: colorPalette.text[200],
        },

        selectors: {
          '&:has(:disabled)': {
            vars: {
              [containedVar.backgroundColor]: color[50],
              [containedVar.color]: colorPalette.text[100],

              [outlinedVar.border]: colorPalette.grey[200],
              [outlinedVar.backgroundColor]: colorPalette.grey[50],
              [outlinedVar.color]: colorPalette.text[100],
            },
          },

          '&:has(:focus)': {
            vars: {
              [containedVar.color]: colorPalette.text[900],

              [outlinedVar.border]: color[700],
              [outlinedVar.color]: colorPalette.text[900],
            },
          },
        },
      });

      return acc;
    }, {} as Record<ColorPalette, string>),

    variant: {
      contained: {
        backgroundColor: containedVar.backgroundColor,
        color: containedVar.color,
      },

      outlined: {
        boxShadow: `inset 0 0 0 0.0625rem ${outlinedVar.border}`,
        backgroundColor: outlinedVar.backgroundColor,
        color: outlinedVar.color,
      },
    },
  },
});

export const textfield = recipe({
  base: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '0.75rem',
    border: '0',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    resize: 'none',

    '::-webkit-scrollbar': {
      width: '0.25rem',
      height: '0.25rem',
    },

    '::-webkit-scrollbar-thumb': {
      borderRadius: '0.25rem',
      backgroundColor: colorPalette.grey[500],
    },

    '::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },

  variants: {
    size: {
      sm: { padding: '0.625rem 0.5rem', fontSize: '0.875rem' },
      md: { padding: '0.75rem 0.625rem', fontSize: '1rem' },
      lg: { padding: '0.875rem 0.75rem', fontSize: '1.125rem' },
    },
  },
});
