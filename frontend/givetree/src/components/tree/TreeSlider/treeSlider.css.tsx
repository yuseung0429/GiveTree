import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const treeImage = style({
  perspective: '1000px',
  transition: 'transform 0.6s',
});

export const flip = style({
  transform: 'rotateY(180deg)',
});

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
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
