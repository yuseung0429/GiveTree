import { style } from '@vanilla-extract/css';

import typography from '@/styles/tokens/typography';
import colorPalette from '@/styles/tokens/colorPalette';

export const highlight = style({
  color: colorPalette.primary[600],
  fontWeight: typography.weight.semiBold,
});
