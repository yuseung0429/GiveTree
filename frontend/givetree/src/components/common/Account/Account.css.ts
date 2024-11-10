import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

// 최상위 부모
export const accountBox = style({
  width: '280px',
  height: '175px',
  backgroundColor: colorPalette.grey[300],
  borderRadius: '5px',
  marginTop: '15px',
  border: `1px solid ${colorPalette.grey[400]}`,
});

export const plus = style({
  width: '40px',
  height: '40px',
  borderRadius: '100%',
  backgroundColor: colorPalette.grey[50],
});
