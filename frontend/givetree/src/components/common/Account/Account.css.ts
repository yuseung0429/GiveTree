import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

// 최상위 부모
export const accountBox = style({
  width: '200px',
  height: '120px',
  backgroundColor: colorPalette.primary[50],
  borderRadius: '5px',
  marginTop: '15px',
});
