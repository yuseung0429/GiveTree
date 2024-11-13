import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const container = style({
  // backgroundColor: '#f5f5f5',
  border: `1px solid ${colorPalette.text[300]}`,
  padding: '1rem',
  margin: '0 0.75rem',
  borderRadius: '8px'
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
