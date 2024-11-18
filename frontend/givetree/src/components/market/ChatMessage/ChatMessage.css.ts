import { recipe } from '@vanilla-extract/recipes';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

export const balloon = recipe({
  base: {
    display: 'inline-block',
    padding: '0.625rem',
    border: `0.0625rem solid ${colorPalette.primary[300]}`,
    borderRadius: '0.625rem',
    lineHeight: '1.375',
    fontSize: typography.size.md,
  },

  variants: {
    isMine: {
      false: {
        backgroundColor: '#fff',
        color: colorPalette.text[900],
      },

      true: {
        backgroundColor: colorPalette.primary[300],
        color: '#fff',
      },
    },
  },
});
