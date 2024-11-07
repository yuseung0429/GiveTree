import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const itembox = style({
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  width: '100%',
  height: '95px',
  border: `1px solid ${colorPalette.grey[400]}`,
});

export const money = style({
  width: '100%',
  textAlign: 'right',
});
