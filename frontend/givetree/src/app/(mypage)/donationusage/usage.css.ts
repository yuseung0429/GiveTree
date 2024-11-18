import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const grabox = style({
  background: `linear-gradient(to bottom, ${colorPalette.primary[300]}, ${colorPalette.primary[100]})`,
  height: '180px',
  width: '100%',
  padding: '1rem',
});
