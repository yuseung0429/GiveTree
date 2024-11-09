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
  backgroundColor: 'skyblue',
  borderRadius: '5px',
  overflow: ' hidden',
});

export const tag = style({
  borderRadius: '30px',
  color: 'white',
  fontSize: '14px',
});

export const money = style({
  color: colorPalette.primary[500],
  fontWeight: '700',
});
