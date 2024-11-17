import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const accountBox = style({
  width: '100%',
  aspectRatio: '8 / 5',
  borderRadius: '5px',
  marginTop: '15px',
});

export const plus = style({
  width: '40px',
  height: '40px',
  borderRadius: '100%',
  backgroundColor: colorPalette.grey[50],
});
