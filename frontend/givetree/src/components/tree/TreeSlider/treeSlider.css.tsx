import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
});

export const dot = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: `${colorPalette.grey[300]}`,
  margin: '0 5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
});

export const activeDot = style({
  backgroundColor: `${colorPalette.grey[600]}`,
});
