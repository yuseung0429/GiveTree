import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

export const container = style({
  margin: '1rem',
  padding: '1rem',
  borderRadius: '0.25rem',
  backgroundColor: '#fff',
  userSelect: 'none',
});

export const message = style({
  minWidth: '66vw',
  padding: '0.5rem 0 1rem',
  lineHeight: '150%',
  wordBreak: 'break-all',
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  gap: '0.25rem',
});

export const button = recipe({
  base: {
    height: '2rem',
    padding: '0 0.75rem',
    border: '0',
    borderRadius: '1rem',
    backgroundColor: 'transparent',
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    transition: 'all 0.2s ease',
  },

  variants: {
    color: {
      primary: {
        color: colorPalette.primary[700],

        ':active': {
          backgroundColor: colorPalette.primary[50],
        },
      },

      secondary: {
        color: colorPalette.secondary[700],

        ':active': {
          backgroundColor: colorPalette.secondary[50],
        },
      },
    },
  },
});
