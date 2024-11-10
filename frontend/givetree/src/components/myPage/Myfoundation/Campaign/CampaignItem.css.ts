import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const container = style({
  backgroundColor: '#fff',
  padding: '1rem',
});

export const imgbox = style({
  width: '38%',
  aspectRatio: '1',
  maxWidth: '125px',
  backgroundColor: '#bae6db',
  borderRadius: '5px',
  overflow: ' hidden',
  position: 'relative',
});

export const tag = style({
  borderRadius: '30px',
  color: 'white',
  fontSize: '14px',
});

export const money = style({
  color: colorPalette.primary[500],
  fontWeight: '600',
});

export const money2 = style({
  fontWeight: '600',
});
