import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const padding20 = style({
  padding: '30px 20px',
});

export const alignCenter = style({
  textAlign: 'center',
});

export const moneybox = style({
  padding: '20px',
  backgroundColor: colorPalette.primary[100],
  borderRadius: '5px',
});
