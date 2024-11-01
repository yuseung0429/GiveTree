import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

// 최상위 부모
export const accountBox = style({
  width: '100%',
  border: `1px solid ${colorPalette.grey[400]}`
});