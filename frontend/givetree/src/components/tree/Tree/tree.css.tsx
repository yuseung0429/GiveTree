import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
  justifyContent: 'center',
  overflow: 'hidden',
  alignItems: 'center',
});

export const treeImage = style({
  display: 'flex',
  width: '100%',
  height: '74vh',
  overflow: 'hidden',
  perspective: '1000px',
  transition: 'transform 0.4s ease',
  filter: 'drop-shadow(0px -3px 12px rgba(68, 68, 68, 0.3))',
});

export const flip = style({
  transform: 'rotateY(180deg)',
});

export const decoration = style({
  position: 'absolute',
  cursor: 'pointer',
  filter: 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2))',
});
