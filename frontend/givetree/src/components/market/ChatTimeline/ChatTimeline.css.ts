import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

export const container = style({
  position: 'sticky',
  top: '0.5rem',
  textAlign: 'center',
});

export const box = style({
  display: 'inline-block',
  width: '6rem',
  padding: '0.625rem',
  borderRadius: '3rem',
  backgroundColor: '#fff',
  color: colorPalette.grey[700],
  fontSize: typography.size.xs,
});
