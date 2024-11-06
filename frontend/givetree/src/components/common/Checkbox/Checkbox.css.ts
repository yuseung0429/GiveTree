import { createVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import colorPalette, { type ColorPalette } from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

const scaleVar = createVar();

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  lineHeight: 0,
  cursor: 'pointer',
  userSelect: 'none',
});

export const input = style({
  display: 'none',
});

export const text = style({
  selectors: {
    [`${input}:disabled ~ &`]: {
      color: colorPalette.text[200],
    },
  },
});

export const checkbox = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.0625rem solid',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    userSelect: 'none',
  },

  variants: {
    color: Object.keys(colorPalette).reduce((acc, palette) => {
      const color = colorPalette[palette as ColorPalette];

      acc[palette as ColorPalette] = style({
        borderColor: color[700],
        backgroundColor: '#fff',
        color: color[500],

        selectors: {
          [`${input}:checked + &`]: {
            backgroundColor: color[500],
          },

          [`${input}:disabled:checked + &`]: {
            borderColor: color[100],
            backgroundColor: color[100],
          },

          [`${input}:disabled:not(:checked) + &`]: {
            borderColor: color[200],
          },
        },
      });

      return acc;
    }, {} as Record<ColorPalette, string>),

    size: {
      sm: {
        width: '1rem',
        height: '1rem',
        marginRight: '0.25rem',
        borderRadius: '0.125rem',
        fontSize: typography.size.sm,

        vars: {
          [scaleVar]: '0.2',
        },
      },

      md: {
        width: '1.375rem',
        height: '1.375rem',
        marginRight: '0.375rem',
        borderRadius: '0.1875rem',
        fontSize: typography.size.md,

        vars: {
          [scaleVar]: '0.29',
        },
      },

      lg: {
        width: '1.75rem',
        height: '1.75rem',
        marginRight: '0.375rem',
        borderRadius: '0.25rem',
        fontSize: typography.size.lg,

        vars: {
          [scaleVar]: '0.35',
        },
      },
    },
  },
});

export const icon = style({
  overflow: 'visible',
  backgroundColor: 'transparent',
  stroke: '#fff',
  strokeDasharray: 131,
  strokeDashoffset: -130,
  strokeLinecap: 'round',
  strokeWidth: '0.53rem',
  fill: 'none',
  transform: `scale(${scaleVar})`,
});

globalStyle(`${icon} > polyline`, {
  transition: 'stroke-dashoffset 0.3s ease',
});

globalStyle(`${input}:checked + div > ${icon} > polyline`, {
  strokeDashoffset: 0,
});
