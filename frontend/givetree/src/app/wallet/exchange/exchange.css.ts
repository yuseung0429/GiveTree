import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const alignCenter = style({
  textAlign: 'center',
});

export const moneybox = style({
  padding: '20px',
  backgroundColor: colorPalette.primary[100],
  borderRadius: '5px',
});

export const bottom = style({
  position: 'sticky',
  bottom: '0',
  padding: '1rem',
  borderTop: `0.0625rem solid ${colorPalette.grey[300]}`,
  backgroundColor: colorPalette.grey[50],
});
